export const adminMenu = [
    {
        // Quản lý người dùng
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.crud",
                link: "/system/user-manage",
            },
            {
                name: "menu.admin.crud-redux",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/markdown-editor",
                // subMenus: [
                //     {
                //         name: "menu.system.system-administrator.user-manage",
                //         link: "/system/user-manage",
                //     },
                //     {
                //         name: "menu.system.system-administrator.user-redux",
                //         link: "/system/user-redux",
                //     },
                // ],
            },
            {
                name: "menu.admin.manage-admin",
                link: "/system/user-admin",
            },
        ],
    },

    {
        // Quản lý phòng khám
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },

    {
        // Quản lý chuyên khoa
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },

        ],
    },
    {
        // Quản lý bài đăng
        name: "menu.admin.blogs",
        menus: [
            {
                name: "menu.admin.manage-blogs",
                link: "/system/manage-blogs",
            },

        ],
    },
];

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-patient',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            }
        ]
    }
]
