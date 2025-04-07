// export const team = [
//     { name: "Alex Merlin", role: "Event Director", image: "/api/placeholder/400/500" },
//     { name: "Sam Spellcaster", role: "Technical Lead", image: "/api/placeholder/400/500" },
//     { name: "Jordan Enchanter", role: "Marketing Head", image: "/api/placeholder/400/500" },
//     { name: "Taylor Sorcerer", role: "Sponsorship Coordinator", image: "/api/placeholder/400/500" },
//   ];

//cover images
import robonixImg from '../static/img/RobotEvolution.jpg'
import eloquenseImg from '../static/img/speaking-e1513074001193.jpeg'
import cybernixImg from '../static/img/cybernix.jpg'
import nirmanImg from '../static/img/civil.jpg'
import illustroImg from '../static/img/illustro.jpg'

//gallery image imports
//robonix
// import robonix_linetraccer from '../static/images/clubs/robonics/linetraccer.JPG'
// import robonix_mazesolver from '../static/images/clubs/robonics/mazesolver.JPG'
// import robonix_robbocarrom from '../static/images/clubs/robonics/robbocarrom.JPG'
// import robonix_robbosoccer from '../static/images/clubs/robonics/robbosoccer.JPG'
// import robonix_terrarover from '../static/images/clubs/robonics/terrarover.JPG'

// //eloquence
// import eloquence_despute from '../static/images/clubs/Eloquence/despute.JPG'
// import eloquence_openmic from '../static/images/clubs/Eloquence/openmic.JPG'
// import eloquence_pictopress from '../static/images/clubs/Eloquence/pictopress.JPG'

// //nirmaan
// import nirmaan_bridgeolare from '../static/images/clubs/nirmaan/bridgeolare.JPG'
// import nirmaan_bridgeomania from '../static/images/clubs/nirmaan/bridgeomania.JPG'
// import nirmaan_cityplanning from '../static/images/clubs/nirmaan/cityplanning.JPG'
// import nirmaan_servoolare from '../static/images/clubs/nirmaan/servoolare.JPG'

// //cybernix
// import cybernix_blindcoding from '../static/images/clubs/cybernix/blindcoding.JPG'
// import cybernix_encoding from '../static/images/clubs/cybernix/encoding.JPG'
// import cybernix_stacktraccer from '../static/images/clubs/cybernix/stacktraccer.JPG'
// import cybernix_webyaward from '../static/images/clubs/cybernix/webyaward.JPG'

// //illustro
// import illustro_bioscope from '../static/images/clubs/lensified/bioscope.jpg'
// import illustro_specrum from '../static/images/clubs/lensified/specrum.JPG'

export const wingData = {
    cybernix: {
        name: 'cybernix',
        coverImage: cybernixImg,
        aboutBrief: "The official Coding Club under Phoenix – The Official Tech Club of Netaji Subhash Engineering College. A vibrant community for cyber enthusiasts, fostering learning, collaboration, and innovation in the realm of cybersecurity and technology.",
        aboutExtended: "Cybernix Club serves as a dynamic hub for coding and cybersecurity enthusiasts, offering a platform where members can engage in learning, collaboration, and innovation within the cybersecurity and technology spheres. Through workshops, seminars, real-time projects and hands-on activities, participants hone their skills and stay updated on the latest trends and developments in the ever-evolving cyber landscape. The club fosters a supportive community where members share insights, exchange ideas, and work together on projects to tackle real-world cybersecurity challenges. With a focus on fostering curiosity, creativity, and excellence, Cybernix Club empowers its members to thrive in the fast-paced and critical field of cybersecurity.",
        members: [
            {
                name: "Abhinil Nath",
                designation: "Wing Lead",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/web-team%2FAbhinil-Nath.jpg?alt=media&token=85dc7427-1334-4ee0-86d5-d26994a7c653",
                socials: {
                    insta: "https://www.instagram.com/_roxxon/",
                    facebook: null,
                    github: "https://github.com/Abhinil-07",
                    linkedin: "https://www.linkedin.com/in/abhinil-nath-16b2381bb/",
                }
            },
            {
                name: "Sohom Saha",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fcybernix%2FWhatsApp%20Image%202024-05-14%20at%2023.52.50_c50e84f6.jpg?alt=media&token=798a1345-dc66-400b-a7c0-ec0af71d9aa9",
                socials: {
                    insta: "https://www.instagram.com/saha.sohom/",
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Rituraj Paul",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fcybernix%2FWhatsApp%20Image%202024-05-14%20at%2023.52.50_7f3fec3d.jpg?alt=media&token=e009ffb6-4af1-4480-a8ca-c4ea26aad7a3",
                socials: {
                    insta: "https://www.instagram.com/riturajpaul18/",
                    facebook: null,
                    github: "https://github.com/laughing-nerd",
                    linkedin: "https://www.linkedin.com/in/rituraj-paul-5b0478233/",
                }
            },
        ],

        gallery: [
            {
                url: cybernix_blindcoding,
                caption: "blindcoding"
            },
            {
                url: cybernix_encoding,
                caption: "encoding"
            },
            {
                url: cybernix_stacktraccer,
                caption: "stacktraccer"
            },
            {
                url: cybernix_webyaward,
                caption: "webyaward"
            },
        ]
    },
    eloquense: {
        name: 'eloquense',
        coverImage: eloquenseImg,
        aboutBrief: "'Eloquence', the official literary club of Netaji Subhash Engineering College Under Phoenix. Fostering articulate expression through public speaking, debate, communication skills development, inspiring confidence and persuasive prowess in students.",
        aboutExtended: "Eloquence Club is a dynamic gathering of individuals passionate about mastering the art of communication. Through workshops, debates, and speeches, members refine their oratory skills, from persuasive rhetoric to captivating storytelling. The club fosters an environment of mutual support and constructive feedback, encouraging members to overcome stage fright and hone their confidence. With diverse topics and formats, Eloquence Club cultivates versatility in expression, empowering members to articulate ideas with clarity and impact. Whether polishing professional presentations or perfecting personal narratives, participants find a welcoming space to sharpen their eloquence and connect with like-minded communicators on a journey of continuous improvement.The Robonix Club is a student community dedicated to advancing skills and knowledge in utilizing modern technology for scientific endeavors. The club focuses on automation, artificial intelligence, and robotics. It provides a platform for students to explore these fields, turning innovative ideas into reality. The club organizes workshops, events, and technical sessions to enhance students’ understanding and practical experience in robotics, mechatronics, and related areas, fostering creativity and passion for technological advancements.",
        members: [
            {
                name: "Aniket Nandi",
                designation: "Wing Lead",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Feloquense%2FWhatsApp%20Image%202024-05-14%20at%2023.49.45_423561fe.jpg?alt=media&token=43c99f84-9e20-4e4b-a064-147e1cf1ad52",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Divyaangan Podder",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Feloquense%2FDivyaanganaPodder.png?alt=media&token=71371737-b40f-4dff-b945-1d65ade1993c",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Asmita Karmakar",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Feloquense%2FWhatsApp%20Image%202024-05-14%20at%2023.50.33_e18bface.jpg?alt=media&token=019fe37e-c5fb-4bd8-b947-08e5cf376da1",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Somnath Dutta",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Feloquense%2FWhatsApp%20Image%202024-05-14%20at%2023.51.40_76f42979.jpg?alt=media&token=3d41bfd1-4ce3-4d22-89c3-8adb053678c4",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
        ],

        gallery: [
            {
                url: eloquence_despute,
                caption: "despute"
            },
            {
                url: eloquence_openmic,
                caption: "openmic"
            },
            {
                url: eloquence_pictopress,
                caption: "pictopress"
            },
        ]
    },
    robonix: {
        name: 'robonix',
        coverImage: robonixImg,
        aboutBrief: "Robonix is the robotics wing of Phoenix – The official Tech Club of Netaji Subhash Engineering College. Innovating robotics, fostering creativity. Explore the future of technology with hands-on projects and collaborative learning experiences with Robonix.",
        aboutExtended: "The Robonix Club is a student community dedicated to advancing skills and knowledge in utilizing modern technology for scientific endeavors. The club focuses on automation, artificial intelligence, and robotics. It provides a platform for students to explore these fields, turning innovative ideas into reality. The club organizes workshops, events, and technical sessions to enhance students’ understanding and practical experience in robotics, mechatronics, and related areas, fostering creativity and passion for technological advancements.",
        members: [
            {
                name: "Krishna Kanta Pal",
                designation: "Wing Lead",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Frobonix%2FWhatsApp%20Image%202024-05-14%20at%2023.47.52_805144f0.jpg?alt=media&token=9c58a5b5-c5d8-4c3d-b0b8-51ba1613decd",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Sandan Biswas",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Frobonix%2FWhatsApp%20Image%202024-05-14%20at%2023.47.15_2bf6ca4b.jpg?alt=media&token=dc6a63e6-11e2-4449-ae34-8b589ba2ac89",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Pranoy Ghorui",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Frobonix%2FWhatsApp%20Image%202024-05-14%20at%2023.48.22_0fea716c.jpg?alt=media&token=2be79c47-8327-4f02-b0ea-8f57bd239c28",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Aritra Bera",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Frobonix%2FWhatsApp%20Image%202024-05-14%20at%2023.48.50_75693a96.jpg?alt=media&token=90bc241a-c531-40db-b4d5-9dcb17f0906c",
                socials: {
                    insta: "https://www.instagram.com/polo_aritra/",
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
        ],

        gallery: [
            {
                url: robonix_linetraccer,
                caption: "linetraccer"
            },
            {
                url: robonix_mazesolver,
                caption: "mazesolver"
            },
            {
                url: robonix_robbocarrom,
                caption: "robbocarrom"
            },
            {
                url: robonix_robbosoccer,
                caption: "robbosoccer"
            },
            {
                url: robonix_terrarover,
                caption: "terrarover"
            },
        ]
    },
    nirman: {
        name: 'nirman',
        coverImage: nirmanImg,
        aboutBrief: "Nirman is the Civil Wing of Phoenix - The official Tech club of Netaji Subhash Engineering College. Nirman engages civil engineering enthusiasts in activities, workshops, and projects to foster skill development and innovation within the field.",
        aboutExtended: "Nirman is a hub for civil engineering enthusiasts, fostering skill development and networking. It offers workshops and seminars to enhance practical knowledge. Members engage in projects spanning construction, infrastructure, and sustainability, honing expertise in areas like structural analysis, project management, collaborative efforts to tackle real-world challenges, encouraging innovation and problem-solving. The club cultivates a community of future engineers, promoting camaraderie and professional growth. With a focus on hands-on learning and industry insights, Nirman Wing empowers members to excel in the dynamic field of civil engineering.",
        members: [
            {
                name: "Trisha Das",
                designation: "Wing Lead",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fnirman%2FWhatsApp%20Image%202024-05-14%20at%2023.45.11_87e17bd4.jpg?alt=media&token=ccb69ed0-b449-4c17-996e-67a06ea2b60e",
                socials: {
                    insta: "https://www.instagram.com/iamtrisha_0405_?igsh=Z3ZqdXRuZW8xeWRt",
                    facebook: "https://www.facebook.com/share/9JF4G3g4cdAzU9iw/?mibextid=qi2Omg",
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Subhajit Pan",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fnirman%2FWhatsApp%20Image%202024-05-14%20at%2023.45.40_41113122.jpg?alt=media&token=081851cb-f279-43db-a522-b2be44af8fbd",
                socials: {
                    insta: "https://www.instagram.com/subhajit_78242?igsh=MWpsbjY4MnAwZ2R5dQ==",
                    facebook: "https://www.facebook.com/share/PhwEFDs4hJyJEUw6/?mibextid=qi2Omg",
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Sangram Ghosh",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fnirman%2FWhatsApp%20Image%202024-05-14%20at%2023.44.16_715d6715.jpg?alt=media&token=191580af-74b7-4f93-a87e-eff11112488b",
                socials: {
                    insta: "https://www.instagram.com/the_silent_zephyr?igsh=MWswMmphZG1waDdoZQ==",
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Souvik Alu",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fnirman%2FWhatsApp%20Image%202024-05-14%20at%2023.45.59_51f813c6.jpg?alt=media&token=e3c1f6f8-79b1-4e71-8a05-487a611626d3",
                socials: {
                    insta: "https://www.instagram.com/souvikk02?igsh=MW4zMnNoNjQyaTc2OQ==",
                    facebook: "https://www.facebook.com/share/QZvpQVLiYWcA8U6w/?mibextid=qi2Omg",
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "Souvik Bhowmik",
                designation: "Wing coordinator",
                profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/phoenix-c88b9.appspot.com/o/Team%20members%2Fnirman%2FWhatsApp%20Image%202024-05-14%20at%2023.46.14_4725546a.jpg?alt=media&token=636e3318-3acf-4063-a64b-1cfdf67206a9",
                socials: {
                    insta: "https://www.instagram.com/souvik7397?igsh=MTVlNHAzNjZteDk0dw==",
                    facebook: "https://www.facebook.com/share/MyF5vrQrVwhH3Wkz/?mibextid=qi2Omg",
                    github: null,
                    linkedin: null,
                }
            },
        ],

        gallery: [
            {
                url: nirmaan_bridgeolare,
                caption: "bridgeolare"
            },
            {
                url: nirmaan_bridgeomania,
                caption: "bridgeomania"
            },
            {
                url: nirmaan_cityplanning,
                caption: "cityplanning"
            },
            {
                url: nirmaan_servoolare,
                caption: "servoolare"
            },
        ]
    },
    illustro: {
        name: 'illustro',
        coverImage: illustroImg,
        aboutBrief: "Illustro is the official photography wing of Phoenix - The official Tech club of Netaji Subhash Engineering College. Capturing moments, creating memories. Explore, learn, and share your passion with Illustro. Join us to unleash your creativity through the lens.",
        aboutExtended: "Illustro is a vibrant community of photography enthusiasts dedicated to capturing moments and exploring the artistry of visual storytelling. From amateur hobbyists to seasoned professionals, members share techniques, critique each other's work, and organize exhibitions to showcase their talents. Regular workshops and guest lectures by industry experts foster skill development and creativity. Through outings and photo walks, members discover new perspectives and subjects, enriching their photographic journeys. With a supportive atmosphere and a passion for imagery, Illustro serves as a hub for fostering talent and camaraderie among photographers of all levels.",
        members: [
            {
                name: "soham das",
                designation: "Wing Lead",
                profileImgUrl: "#",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "soham das",
                designation: "Wing coordinator",
                profileImgUrl: "#",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "soham das",
                designation: "Wing coordinator",
                profileImgUrl: "#",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
            {
                name: "soham das",
                designation: "Wing coordinator",
                profileImgUrl: "#",
                socials: {
                    insta: null,
                    facebook: null,
                    github: null,
                    linkedin: null,
                }
            },
        ],

        gallery: [
            {
                url: illustro_bioscope,
                caption: "bioscope"
            },
            {
                url: illustro_specrum,
                caption: "specrum"
            },
        ]
    },

}