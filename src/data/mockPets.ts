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
    videoUrl: "/videos/6846176-uhd_2160_3840_25fps.mp4",
    petName: "Bunbun",
    age: 1,
    species: "Rabbit",
    breed: "Holland Lop",
    location: "Toronto, ON",
    shelter: "Toronto Rabbit Rescue",
    shortLabel: "Cozy and cute",
    description: "Bunbun loves hopping around on soft beds and munching on fresh greens. He's looking for a quiet home with plenty of hay!",
    tags: ["Indoor rabbit", "Litter trained", "Gentle"],
    thumbnailUrl: "https://images.unsplash.com/photo-1585110396065-88b74f368e4e?w=400"
  },
  {
    id: "2",
    videoUrl: "/videos/5877842-hd_1080_1920_30fps.mp4",
    petName: "Cooper",
    age: 0.5,
    species: "Dog",
    breed: "Golden Retriever",
    location: "Vancouver, BC",
    shelter: "BC SPCA",
    shortLabel: "Playful puppy",
    description: "Cooper is a bundle of joy who loves exploring the garden. He's still learning his manners but makes up for it with endless kisses.",
    tags: ["Puppy", "Good with kids", "High energy"],
    thumbnailUrl: "https://images.unsplash.com/photo-1601979031925-424e5d4a7874?w=400"
  },
  {
    id: "3",
    videoUrl: "/videos/5574250-hd_1080_1920_29fps.mp4",
    petName: "Whiskers",
    age: 4,
    species: "Cat",
    breed: "Domestic Shorthair",
    location: "Montreal, QC",
    shelter: "Montreal SPCA",
    shortLabel: "Chill and relaxed",
    description: "Whiskers is a master of relaxation. She loves sunbathing and watching the world go by. Perfect for a calm household.",
    tags: ["Indoor/Outdoor", "Calm", "Independent"],
    thumbnailUrl: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400"
  },
  {
    id: "4",
    videoUrl: "/videos/4838318-uhd_2160_3840_24fps.mp4",
    petName: "Bella",
    age: 0.3,
    species: "Dog",
    breed: "French Bulldog",
    location: "Calgary, AB",
    shelter: "Calgary Humane Society",
    shortLabel: "Tiny but mighty",
    description: "Bella may be small, but she has a big personality! She loves perching on stools and observing everything. A true little supervisor.",
    tags: ["Puppy", "Apartment friendly", "Affectionate"],
    thumbnailUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400"
  },
  {
    id: "5",
    videoUrl: "/videos/5729496-uhd_2160_3840_24fps.mp4",
    petName: "Max & Ruby",
    age: 2,
    species: "Dog",
    breed: "Mixed Breed",
    location: "Ottawa, ON",
    shelter: "Ottawa Humane Society",
    shortLabel: "Party animals",
    description: "These two are inseparable and love playing with balloons! They bring double the fun and double the love.",
    tags: ["Bonded pair", "Playful", "Good with dogs"],
    thumbnailUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400"
  },
  {
    id: "6",
    videoUrl: "/videos/13062691_2160_3840_30fps.mp4",
    petName: "Luna",
    age: 1,
    species: "Cat",
    breed: "Siamese",
    location: "Edmonton, AB",
    shelter: "Edmonton Animal Care",
    shortLabel: "Curious explorer",
    description: "Luna is always on the prowl for new adventures. She's vocal, affectionate, and loves to be the center of attention.",
    tags: ["Vocal", "Active", "Smart"],
    thumbnailUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400"
  },
  {
    id: "7",
    videoUrl: "/videos/14541209_1080_1920_30fps.mp4",
    petName: "Oliver",
    age: 3,
    species: "Cat",
    breed: "Persian",
    location: "Winnipeg, MB",
    shelter: "Winnipeg Pet Rescue",
    shortLabel: "Fluffy prince",
    description: "Oliver is a majestic fluffball with striking eyes. He enjoys grooming sessions and quiet evenings by the fireplace.",
    tags: ["Long hair", "Calm", "Indoor only"],
    thumbnailUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400"
  }
];
