
import { createContext, useContext, useEffect, useState } from 'react';

// --- Types & Interfaces ---
interface MockUser { id: string; email: string; }
interface MockSession { user: MockUser; }

const AuthContext = createContext<{ session: MockSession | null; isLoading: boolean }>({ session: null, isLoading: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<MockSession | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('pawmora-mock-session');
        if (stored) setSession(JSON.parse(stored));
    }, []);

    return (
        <AuthContext.Provider value={{ session, isLoading: false }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// --- MOCK DATABASE IMPLEMENTATION ---
const getTable = (table: string) => {
    const data = localStorage.getItem(`pawmora-db-${table}`);
    return data ? JSON.parse(data) : [];
};

const setTable = (table: string, data: any[]) => {
    localStorage.setItem(`pawmora-db-${table}`, JSON.stringify(data));
};

// Chainable Mock Builder (Thenable)
class MockQueryBuilder {
    table: string;
    filters: Array<(row: any) => boolean>;
    modifiers: any;
    op: 'select' | 'insert' | 'update' | 'delete';
    payload: any;

    constructor(table: string) {
        this.table = table;
        this.filters = [];
        this.modifiers = {};
        this.op = 'select'; // Default
    }

    // --- Actions (set op, return this) ---
    select(columns = '*', { count }: { count?: string } = {}) {
        this.op = 'select';
        if (count) this.modifiers.count = true;
        return this;
    }

    insert(data: any) {
        this.op = 'insert';
        this.payload = data;
        return this;
    }

    update(data: any) {
        this.op = 'update';
        this.payload = data;
        return this;
    }

    upsert(data: any, { onConflict }: { onConflict?: string } = {}) {
        this.op = 'upsert';
        this.payload = { data, onConflict };
        return this;
    }

    delete() {
        this.op = 'delete';
        return this;
    }

    // --- Filters (update state, return this) ---
    eq(column: string, value: any) {
        this.filters.push(row => row[column] === value);
        return this;
    }

    neq(column: string, value: any) {
        this.filters.push(row => row[column] !== value);
        return this;
    }

    in(column: string, values: any[]) {
        this.filters.push(row => values.includes(row[column]));
        return this;
    }

    // --- Modifiers ---
    order(column: string, { ascending = true } = {}) {
        this.modifiers.order = { column, ascending };
        return this;
    }

    limit(n: number) {
        this.modifiers.limit = n;
        return this;
    }

    single() {
        this.modifiers.single = true;
        return this;
    }

    maybeSingle() {
        this.modifiers.maybeSingle = true;
        return this;
    }

    // --- Execution (Thenable) ---
    then(onfulfilled?: ((value: any) => any), onrejected?: ((reason: any) => any)) {
        const result = this._execute();
        return Promise.resolve(result).then(onfulfilled, onrejected);
    }

    _execute() {
        const current = getTable(this.table);
        let rows = [...current];

        // 1. FILTERING (Common for all ops usually, but mostly select/update/delete)
        if (this.op !== 'insert') {
            for (const f of this.filters) {
                rows = rows.filter(f);
            }
        }

        // 2. OPERATIONS
        if (this.op === 'select') {
            if (this.modifiers.order) {
                const { column, ascending } = this.modifiers.order;
                rows.sort((a: any, b: any) => {
                    if (a[column] < b[column]) return ascending ? -1 : 1;
                    if (a[column] > b[column]) return ascending ? 1 : -1;
                    return 0;
                });
            }
            if (this.modifiers.limit) {
                rows = rows.slice(0, this.modifiers.limit);
            }

            if (this.modifiers.single) {
                if (rows.length === 0) return { data: null, error: { message: 'Row not found' } };
                if (rows.length > 1) return { data: null, error: { message: 'Multiple rows found' } };
                return { data: rows[0], error: null };
            }
            if (this.modifiers.maybeSingle) {
                if (rows.length === 0) return { data: null, error: null };
                return { data: rows[0], error: null };
            }

            return { data: rows, error: null, count: this.modifiers.count ? rows.length : null };
        }

        if (this.op === 'insert') {
            const input = Array.isArray(this.payload) ? this.payload : [this.payload];
            const newRows = input.map((r: any) => ({
                ...r,
                id: r.id || Math.random().toString(36).substr(2, 9),
                created_at: new Date().toISOString()
            }));
            const updatedTable = [...current, ...newRows];
            setTable(this.table, updatedTable);
            return { data: newRows, error: null };
        }

        if (this.op === 'update') {
            const matchingIds = new Set(rows.map((r: any) => r.id));
            const updatedTable = current.map((row: any) => {
                if (matchingIds.has(row.id)) {
                    return { ...row, ...this.payload };
                }
                return row;
            });
            setTable(this.table, updatedTable);
            return { data: null, error: null };
        }

        if (this.op === 'upsert') {
            const { data, onConflict } = this.payload;
            const input = Array.isArray(data) ? data : [data];
            let updatedTable = [...current];

            input.forEach((newItem: any) => {
                // Find existing based on onConflict (default to id)
                const conflictKey = onConflict || 'id';
                const existingIndex = updatedTable.findIndex(r => r[conflictKey] === newItem[conflictKey]);

                if (existingIndex >= 0) {
                    // Update
                    updatedTable[existingIndex] = { ...updatedTable[existingIndex], ...newItem };
                } else {
                    // Insert
                    updatedTable.push({
                        ...newItem,
                        id: newItem.id || Math.random().toString(36).substr(2, 9),
                        created_at: new Date().toISOString()
                    });
                }
            });

            setTable(this.table, updatedTable);
            return { data: input, error: null };
        }

        if (this.op === 'delete') {
            const matchingIds = new Set(rows.map((r: any) => r.id));
            const remaining = current.filter((row: any) => !matchingIds.has(row.id));
            setTable(this.table, remaining);
            return { data: null, error: null };
        }
    }
}

// Global Supabase Mock
export const supabase = {
    auth: {
        signInWithPassword: async ({ email }: { email: string }) => {
            const user = { user: { id: 'mock-user-id', email } };
            localStorage.setItem('pawmora-mock-session', JSON.stringify(user));
            setTimeout(() => window.location.reload(), 100);
            return { data: user, error: null };
        },
        signOut: async () => {
            localStorage.removeItem('pawmora-mock-session');
            setTimeout(() => window.location.reload(), 100);
            return { error: null };
        },
        getSession: async () => ({
            data: { session: JSON.parse(localStorage.getItem('pawmora-mock-session') || 'null') },
            error: null
        }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        getUser: async () => {
            const session = JSON.parse(localStorage.getItem('pawmora-mock-session') || 'null');
            return { data: { user: session?.user || null }, error: null };
        }
    },
    from: (table: string) => new MockQueryBuilder(table),
    storage: {
        from: () => ({
            getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
            upload: async () => ({ data: { path: 'mock-upload-path' }, error: null })
        })
    }
};
