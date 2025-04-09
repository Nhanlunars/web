export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            {
                name: 'menu.system.system-administrator.header',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                    { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                ]
            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];

export const ownerMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {//Quản lý kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
            {//Quản lý bệnh nhân khám bệnh bác sĩ
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            },
        ]

    }
];