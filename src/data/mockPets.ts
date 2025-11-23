export interface Pet {
  id: string;
  videoUrl: string;
  petName: string;
  age: number;
  species: string;
  breed: string;
  location: string;
  shelter: string;
  shortLabel: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
}

export const mockPets: Pet[] = [
  {
    id: "1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    petName: "Luna",
    age: 2,
    species: "Dog",
    breed: "Golden Retriever Mix",
    location: "San Francisco, CA",
    shelter: "Golden Gate Animal Shelter",
    shortLabel: "Shy but cuddly",
    description: "Luna is a sweet and gentle soul who loves quiet afternoons and belly rubs. She's great with kids and other dogs, and she's already house-trained!",
    tags: ["Good with kids", "Good with other pets", "House trained"],
    thumbnailUrl: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400"
  },
  {
    id: "2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    petName: "Oliver",
    age: 3,
    species: "Cat",
    breed: "Tabby",
    location: "Oakland, CA",
    shelter: "East Bay Cat Rescue",
    shortLabel: "Playful and affectionate",
    description: "Oliver loves to play with feather toys and curl up in warm laps. He's a talkative boy who will tell you all about his day!",
    tags: ["Indoor cat", "Good with kids", "Playful"],
    thumbnailUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400"
  },
  {
    id: "3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    petName: "Bella",
    age: 1,
    species: "Dog",
    breed: "Beagle",
    location: "Berkeley, CA",
    shelter: "Berkeley Humane Society",
    shortLabel: "Energetic and loving",
    description: "Bella is full of energy and loves going on adventures! She's perfect for an active family who enjoys hiking and outdoor activities.",
    tags: ["High energy", "Good with kids", "Loves outdoors"],
    thumbnailUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400"
  },
  {
    id: "4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    petName: "Milo",
    age: 4,
    species: "Cat",
    breed: "Siamese Mix",
    location: "San Jose, CA",
    shelter: "South Bay Animal Haven",
    shortLabel: "Calm and cuddly",
    description: "Milo is a laid-back gentleman who enjoys sunny windowsills and gentle pets. He's perfect for someone looking for a quiet companion.",
    tags: ["Indoor cat", "Calm", "Senior-friendly"],
    thumbnailUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"
  },
  {
    id: "5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    petName: "Charlie",
    age: 5,
    species: "Dog",
    breed: "Labrador",
    location: "Palo Alto, CA",
    shelter: "Peninsula Pet Rescue",
    shortLabel: "Loyal and friendly",
    description: "Charlie is a gentle giant with a heart of gold. He loves everyone he meets and is always ready for a game of fetch!",
    tags: ["Good with kids", "Good with other pets", "Trained"],
    thumbnailUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400"
  }
];
