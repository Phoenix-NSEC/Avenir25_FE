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
          photo: "../../public/CoreProfilePics/IMG_20240319_112234_078 - Somnath Dutta.jpg",

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
          photo: "../../public/CoreProfilePics/Junaid Da.jpg",
          socials: {
            instagram: "https://www.instagram.com/_.tfzuu._/",
            // linkedin: "https://linkedin.com/in/priya-patel"
          }
        },
        {
          id: "core-3",
          name: "Divya Jyoti Raj",
          designation: "Vice President",
          photo: "../../public/CoreProfilePics/IMG-20240810-WA0018(1) - Divya Raj.jpg",
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
          photo: "../../public/CoreProfilePics/DSC07571 - Mrittika Majumder.JPG",
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
          photo: "../../public/CoreProfilePics/IMG_20240812_003949 - Debarati Mondal.jpg",
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
          photo: "../../public/CoreProfilePics/IMG_20240820_011035 - Arnab Das.jpg",
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
          photo: "../../public/CoreProfilePics/IMG_20240812_003949 - Debarati Mondal.jpg",
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
          photo: "../../public/CoreProfilePics/Sheikh_Ikram_Hossain - Sheikh Ikram Hossain.jpg",
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
          photo: "../../public/CoreProfilePics/IMG_20231019_142757 - Sambaran Das.jpg",
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
          photo: "../../public/CoreProfilePics/SAVE_20230502_155550 - Subhajit Kundu.jpg",
          socials: {
            instagram: "https://www.instagram.com/subhajit_kundu001/",
            linkedin: "https://www.linkedin.com/in/subhajit-kundu-043403207/",
            github: "https://github.com/subhajit033"
          }
        },
        {
          id: "wing-3",
          name: "sagnik Nath",
          designation: "Illustro Lead",
          photo: "../../public/CoreProfilePics/IMG_20240523_141021_220 - Sagnik.jpg",
          socials: {
            instagram: "https://www.instagram.com/sagnik_20_/",
            // linkedin: "https://linkedin.com/in/arjun-singh"
          }
        },
        {
          id: "wing-4",
          name: "sayan Khan",
          designation: "Illustro Lead",
          photo: "../../public/CoreProfilePics/Picsart_24-07-08_21-21-48-344 - Sayan Khan.jpg",
          socials: {
            instagram: "https://www.instagram.com/sayank2004/",
            // linkedin: "https://linkedin.com/in/arjun-singh"
          }
        },
        {
          id: "wing-5",
          name: "Anushka Tarafdar",
          designation: "Robonix Lead",
          photo: "../../public/CoreProfilePics/Screenshot_20240903_235728_Gallery - Anushka Tarafdar.jpg",
          socials: {
            instagram: "https://www.instagram.com/anushka_tarafdar/",
            // linkedin: "https://linkedin.com/in/meera-joshi"
          }
        },
        {
          id: "wing-6",
          name: "shrestha Chandra",
          designation: "Robonix Lead",
          photo: "../../public/CoreProfilePics/", /*------------------------------------------------------------------------------------------------------- */
          socials: {
            
            // instagram: "https://instagram.com/meera",
            // linkedin: "https://linkedin.com/in/meera-joshi"
          }
        },
        {
          id: "wing-7",
          name: "Shramana Bhattacharya",
          designation: "Eloquense Lead",
          photo: "../../public/CoreProfilePics/Snapchat-2115574052 - Shramana Bhattacharya.jpg",
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
          photo: "../../public/CoreProfilePics/Screenshot_2024-08-29-20-08-12-380-edit_com.instagram.android - Ayanangshu maity.jpg",
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
          photo: "../../public/CoreProfilePics/IMG-20230513-WA0016 - Sonu Kumar.jpg",
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
          photo: "../../public/CoreProfilePics/Rhishav_Virtuix.jpeg",
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
          photo: "../../public/CoreProfilePics/1000600702 - Rudranil Das.jpg",
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
          photo: "/api/placeholder/300/300",
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
          photo: "../../public/CoreProfilePics/IMG_20231019_142757 - Sambaran Das.jpg",
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
          photo: "../../public/CoreProfilePics/SAVE_20230502_155550 - Subhajit Kundu.jpg",
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
          photo: "../../public/CoreProfilePics/",/*?????????????????????????????????????????????????????????????????????????????????????????????????????*/
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
          photo: "../../public/CoreProfilePics/IMG_20240829_224616 - Amrit Bhattacharya.jpg",
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
          photo: "../../public/CoreProfilePics/Cybernix_image - Anindita Dey.jpeg",
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
          photo: "../../public/CoreProfilePics/IMG-20240225-WA0285 - Dibyendu Mandal.jpg",
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
          photo: "../../public/CoreProfilePics/Photo_1725024120965 - Gourab Das.png",
          socials: {
            instagram: "https://www.instagram.com/mrdot_it/",
            linkedin: "https://www.linkedin.com/in/gourab2005/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            github: "https://github.com/Gourab2005"
          }
        },
        {
          id: "dev-8",
          name: "Sayan Mondal",
          designation: "Frontend Developer",
          photo: "../../public/CoreProfilePics/IMG_20221220_155240 - Sayan Mondal.jpg",
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
          photo: "../../public/CoreProfilePics/Sebanti_Cybernix.jpeg",
          socials: {
            instagram: "https://www.instagram.com/sdasgupta39/",
            linkedin: "https://www.linkedin.com/in/sebanti-dasgupta-515541243/",
            github: "https://github.com/Sebanti2003"
          }
        }
     
      ]
    }
  ];