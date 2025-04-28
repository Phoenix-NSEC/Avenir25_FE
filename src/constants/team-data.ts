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
          name: "Somnath Dutta",
          designation: "President",
          photo: "/ProfilePics/Somnath Dutta.webp",

          socials: {
            instagram: "https://www.instagram.com/parth_onenine/",
            // linkedin: "https://linkedin.com/in/aditya-sharma",
            // github: "https://github.com/adityasharma"
          }
        },
        {
          id: "core-2",
          name: "Junaid Tarafdar",
          designation: "General Secretary",
          photo: "/ProfilePics/Junaid Tarafdar.webp",
          socials: {
            instagram: "https://www.instagram.com/_.tfzuu._/",
            // linkedin: "https://linkedin.com/in/priya-patel"
          }
        },
        {
          id: "core-3",
          name: "Divya Jyoti Raj",
          designation: "Vice President",
          photo: "/ProfilePics/Divya Raj.webp",
          socials: {
            instagram: "https://www.instagram.com/heydivyaraj/"
            // linkedin: "https://linked
            // in.com/in/rahul-verma",
            // github: "https://github.com/rahulverma"
          }
        },
        {
          id: "core-4",
          name: "Mrittika Majumder",
          designation: "Treasurer",
          photo: "/ProfilePics/Mrittika Majumder.webp",
          socials: {
            instagram: "https://www.instagram.com/mri.tt.ika/",
            // linkedin: "https://linkedin.com/in/rahul-verma",
            // github: "https://github.com/rahulverma"
          }
        },
        {
          id: "core-5",
          name: "Debojit Saha",
          designation: "Tech Lead",
          photo: "/ProfilePics/Debojit Saha.webp",
          socials: {
            instagram: "https://www.instagram.com/_debojit.___/"
            // linkedin: "https://linkedin.com/in/rahul-verma",
            // github: "https://github.com/rahulverma"
          }
        },
        {
          id: "core-6",
          name: "Arnab Das",
          designation: "Convenor",
          photo: "/ProfilePics/Arnab Das.webp",
          socials: {
            instagram: "https://www.instagram.com/the_ad_virus/",
            // linkedin: "https://linkedin.com/in/rahul-verma",
            // github: "https://github.com/rahulverma"
          }
        },
        {
          id: "core-7",
          name: "Debarati Mondal",
          designation: "PR Lead",
          photo: "/ProfilePics/Debarati Mondal.webp",
          socials: {
            instagram: "https://www.instagram.com/deba_arati/"
            // linkedin: "https://linkedin.com/in/rahul-verma",
            // github: "https://github.com/rahulverma"
          }
        },
        {
          id: "core-8",
          name: "Sheikh Ikram Hossain",
          designation: "Sponsor & Outreach Lead",
          photo: "/ProfilePics/Sheikh Ikram Hossain.webp",
          socials: {
            instagram: "https://www.instagram.com/ikram_storm/"
            // linkedin: "https://linkedin.com/in/rahul-verma",
            // github: "https://github.com/rahulverma"
          }
        }
      ]
    },
    {
      title: "Wing Leads",
      members: [
        {
          id: "wing-1",
          name: "Sambaran Das",
          designation: "Cybernix Lead",
          photo: "/ProfilePics/Sambaran Das.webp",
          socials: {
            instagram: "https://www.instagram.com/sambarandas04/",
            linkedin: "https://www.linkedin.com/in/sambaran-das/",
            github: "https://github.com/Sambaran04"
          }
        },
        {
          id: "wing-2",
          name: "Subhajit Kundu",
          designation: "Cybernix Lead",
          photo: "/ProfilePics/Subhajit Kundu.webp",
          socials: {
            instagram: "https://www.instagram.com/subhajit_kundu001/",
            linkedin: "https://www.linkedin.com/in/subhajit-kundu-043403207/",
            github: "https://github.com/subhajit033"
          }
        },
        {
          id: "wing-3",
          name: "Sagnik Nath",
          designation: "Illustro Lead",
          photo: "/ProfilePics/Sagnik Nath.webp",
          socials: {
            instagram: "https://www.instagram.com/sagnik_20_/",
            // linkedin: "https://linkedin.com/in/arjun-singh"
          }
        },
        {
          id: "wing-4",
          name: "Sayan Khan",
          designation: "Illustro Lead",
          photo: "/ProfilePics/Sayan Khan.webp",
          socials: {
            instagram: "https://www.instagram.com/sayank2004/",
            // linkedin: "https://linkedin.com/in/arjun-singh"
          }
        },
        {
          id: "wing-5",
          name: "Anushka Tarafdar",
          designation: "Robonix Lead",
          photo: "/ProfilePics/Anushka Tarafdar.webp",
          socials: {
            instagram: "https://www.instagram.com/anushka_tarafdar/",
            // linkedin: "https://linkedin.com/in/meera-joshi"
          }
        },
        {
          id: "wing-6",
          name: "Srestha Chandra",
          designation: "Robonix Lead",
          photo: "/ProfilePics/Srestha Chandra.webp", /*------------------------------------------------------------------------------------------------------- */
          socials: {
            
            // instagram: "https://instagram.com/meera",
            // linkedin: "https://linkedin.com/in/meera-joshi"
          }
        },
        {
          id: "wing-7",
          name: "Shramana Bhattacharya",
          designation: "Eloquense Lead",
          photo: "/ProfilePics/Shramana Bhattacharya.webp",
          socials: {
            instagram: "https://www.instagram.com/shramana_2003/"
            // linkedin: "https://linkedin.com/in/karthik-rajan",
            // github: "https://github.com/karthikrajan"
          }
        },
        {
          id: "wing-8",
          name: "Ayanangshu Maity",
          designation: "Eloquense Lead",
          photo: "/ProfilePics/Ayanangshu Maity.webp",
          socials: {
            instagram: "https://www.instagram.com/npc_maity/"
            // linkedin: "https://linkedin.com/in/karthik-rajan",
            // github: "https://github.com/karthikrajan"
          }
        },
        {
          id: "wing-9",
          name: "Sonu Kumar",
          designation: "Virtuix Lead",
          photo: "/ProfilePics/Sonu Kumar.webp",
          socials: {
            // instagram: "https://www.instagram.com/anushka_tarafdar/"
            // linkedin: "https://linkedin.com/in/karthik-rajan",
            // github: "https://github.com/karthikrajan"
          }
        },
        {
          id: "wing-10",
          name: "Rishav Chanda",
          designation: "Virtuix Lead",
          photo: "/ProfilePics/Rhishav Chanda.webp",
          socials: {
            // instagram: "https://www.instagram.com/anushka_tarafdar/"
            // linkedin: "https://linkedin.com/in/karthik-rajan",
            // github: "https://github.com/karthikrajan"
          }
        },
        {
          id: "wing-7",
          name: "Rudranil Das",
          designation: "Virtuix Lead",
          photo: "/ProfilePics/Rudranil Das.webp",
          socials: {
            instagram: "https://www.instagram.com/__.rudranil.__/"
            // linkedin: "https://linkedin.com/in/karthik-rajan",
            // github: "https://github.com/karthikrajan"
          }
        },
        {
          id: "wing-8",
          name: "Krishnava Ghosh",
          designation: "Asst Tech Lead",
          photo: "/ProfilePics/Krishnava Ghosh.webp",
          socials: {
            instagram: "https://www.instagram.com/krishnava_ghosh/",
            linkedin: "https://www.linkedin.com/in/krishnavaghosh/",
            github: "https://github.com/Gadzrux"
          }
        },
      ]
    },
    {
      title: "Dev Team",
      members: [
        {
          id: "dev-1",
          name: "Sambaran Das",
          designation: "Web Administrator",
          photo: "/ProfilePics/Sambaran Das.webp",
          socials: {
            instagram: "https://www.instagram.com/sambarandas04/",
            linkedin: "https://www.linkedin.com/in/sambaran-das/",
            github: "https://github.com/Sambaran04"
          }
        },
        {
          id: "dev-2",
          name: "Subhajit Kundu",
          designation: "Web Administrator",
          photo: "/ProfilePics/Subhajit Kundu.webp",
          socials: {
            instagram: "https://www.instagram.com/subhajit_kundu001/",
            linkedin: "https://www.linkedin.com/in/subhajit-kundu-043403207/",
            github: "https://github.com/subhajit033"
          }
        },
        {
          id: "dev-3",
          name: "Krishnava Ghosh",
          designation: "Web Administrator",
          photo: "/ProfilePics/Krishnava Ghosh.webp",
          socials: {
            instagram: "https://www.instagram.com/krishnava_ghosh/",
            linkedin: "https://www.linkedin.com/in/krishnavaghosh/",
            github: "https://github.com/Gadzrux"
          }
        },
        {
          id: "dev-4",
          name: "Amrit Bhattacharya",
          designation: "Full Stack Developer",
          photo: "/ProfilePics/Amrit Bhattacharya.webp",
          socials: {
            instagram: "https://www.instagram.com/amritb03",
            linkedin: "https://www.linkedin.com/in/amritbhattacharya2003/",
            github: "https://github.com/amrit03b"
          }
        },
        {
          id: "dev-5",
          name: "Anindita Dey",
          designation: "Frontend Developer",
          photo: "/ProfilePics/Anindita Dey.webp",
          socials: {
            instagram: "https://www.instagram.com/__pastel_hues__/",
            linkedin: "https://www.linkedin.com/in/anindita-dey-b81210217/",
            github: "https://github.com/anindita-01"
          }
        },
        {
          id: "dev-6",
          name: "Dibyendu Mandal",
          designation: "Full Stack Developer",
          photo: "/ProfilePics/Dibyendu Mandal.webp",
          socials: {
            instagram: "https://www.instagram.com/dibyendu_04_?utm_source=qr&igsh=MTNsdXU4ZTFtYWJxaQ%3D%3D",
            linkedin: "https://www.linkedin.com/in/dibyendu-mandal-url/",
            github: "https://github.com/Dibyendu-kyo"
          }
        },
        {
          id: "dev-7",
          name: "Gourab Das",
          designation: "Frontend Developer",
          photo: "/ProfilePics/Gourab Das.webp",
          socials: {
            instagram: "https://www.instagram.com/mrdot_it/",
            linkedin: "https://www.linkedin.com/in/gourab2005/",
            github: "https://github.com/Gourab2005"
          }
        },
        {
          id: "dev-8",
          name: "Sayan Mondal",
          designation: "Frontend Developer",
          photo: "/ProfilePics/Sayan Mondal.webp",
          socials: {
            instagram: "https://www.instagram.com/sayan_1.6.4.3/",
            linkedin: "https://www.linkedin.com/in/sayan-mondal-4b5835255/",
            github: "https://github.com/SayanMondal-1643"
          }
        },
        {
          id: "dev-9",
          name: "Sebanti Dasgupta",
          designation: "Full Stack Developer",
          photo: "/ProfilePics/Sebanti.webp",
          socials: {
            instagram: "https://www.instagram.com/sdasgupta39/",
            linkedin: "https://www.linkedin.com/in/sebanti-dasgupta-515541243/",
            github: "https://github.com/Sebanti2003"
          }
        }
     
      ]
    }
  ];