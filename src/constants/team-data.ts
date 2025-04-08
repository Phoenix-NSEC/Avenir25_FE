// team-data.ts
export interface TeamMember {
    id: string;
    name: string;
    designation: string;
    photo: string; // URL to photo
    socials: {
      instagram?: string;
      linkedin?: string;
      github?: string;
    };
  }
  
  export interface TeamSection {
    title: string;
    members: TeamMember[];
  }
  
  export const teamData: TeamSection[] = [
    {
      title: "Core Team",
      members: [
        {
          id: "core-1",
          name: "Aditya Sharma",
          designation: "Festival Director",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/aditya",
            linkedin: "https://linkedin.com/in/aditya-sharma",
            github: "https://github.com/adityasharma"
          }
        },
        {
          id: "core-2",
          name: "Priya Patel",
          designation: "Associate Director",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/priya",
            linkedin: "https://linkedin.com/in/priya-patel"
          }
        },
        {
          id: "core-3",
          name: "Rahul Verma",
          designation: "Operations Head",
          photo: "/api/placeholder/300/300",
          socials: {
            linkedin: "https://linkedin.com/in/rahul-verma",
            github: "https://github.com/rahulverma"
          }
        }
      ]
    },
    {
      title: "Wing Leads",
      members: [
        {
          id: "wing-1",
          name: "Neha Gupta",
          designation: "Technical Wing Lead",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/neha",
            linkedin: "https://linkedin.com/in/neha-gupta",
            github: "https://github.com/nehagupta"
          }
        },
        {
          id: "wing-2",
          name: "Arjun Singh",
          designation: "Creative Wing Lead",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/arjun",
            linkedin: "https://linkedin.com/in/arjun-singh"
          }
        },
        {
          id: "wing-3",
          name: "Meera Joshi",
          designation: "Marketing Wing Lead",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/meera",
            linkedin: "https://linkedin.com/in/meera-joshi"
          }
        },
        {
          id: "wing-4",
          name: "Karthik Rajan",
          designation: "Events Wing Lead",
          photo: "/api/placeholder/300/300",
          socials: {
            linkedin: "https://linkedin.com/in/karthik-rajan",
            github: "https://github.com/karthikrajan"
          }
        }
      ]
    },
    {
      title: "Dev Team",
      members: [
        {
          id: "dev-1",
          name: "Ananya Desai",
          designation: "Frontend Developer",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/ananya",
            linkedin: "https://linkedin.com/in/ananya-desai",
            github: "https://github.com/ananyaDesai"
          }
        },
        {
          id: "dev-2",
          name: "Vikram Choudhary",
          designation: "Backend Developer",
          photo: "/api/placeholder/300/300",
          socials: {
            linkedin: "https://linkedin.com/in/vikram-choudhary",
            github: "https://github.com/vikramchoudhary"
          }
        },
        {
          id: "dev-3",
          name: "Sarika Patel",
          designation: "UI/UX Designer",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/sarikadesigns",
            linkedin: "https://linkedin.com/in/sarika-patel"
          }
        },
        {
          id: "dev-4",
          name: "Rohit Kumar",
          designation: "Full Stack Developer",
          photo: "/api/placeholder/300/300",
          socials: {
            linkedin: "https://linkedin.com/in/rohit-kumar",
            github: "https://github.com/rohitkumar"
          }
        },
        {
          id: "dev-5",
          name: "Deepak Sharma",
          designation: "Mobile Developer",
          photo: "/api/placeholder/300/300",
          socials: {
            instagram: "https://instagram.com/deepaksharma",
            github: "https://github.com/deepaksharma"
          }
        },
        {
          id: "dev-6",
          name: "Tanya Mishra",
          designation: "Database Administrator",
          photo: "/api/placeholder/300/300",
          socials: {
            linkedin: "https://linkedin.com/in/tanya-mishra",
            github: "https://github.com/tanyamishra"
          }
        }
      ]
    }
  ];