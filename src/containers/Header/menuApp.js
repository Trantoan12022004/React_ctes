export const adminMenu = [
    {
        // Quản lý người dùng
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.user-create",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.user-display",
                link: "/system/user-display",
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
            // {
            //     name: "menu.admin.user-display",
            //     link: "/system/markdown-editor",

            // },

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
