const Menus = [
    {
        role: 'admin',
        menu: [
            {
                icon: 'HomeIcon',
                label: 'dashboard',
                path: 'dashboard'
            },
            {
                icon: 'GroupIcon',
                label: 'users',
                path: 'users'
            }
        ]
    },
    {
        role: 'manager',
        menu: [
            {
                icon: 'HomeIcon',
                label: 'dashboard',
                path: 'dashboard'
            },
            {
                icon: 'GroupIcon',
                label: 'users',
                path: 'users'
            },
            {
                icon: 'HomeRepairServiceIcon',
                label: 'companies',
                path: 'companies'
            }
        ]
    },
    {
        role: 'accountant',
        menu: [
            {
                icon: 'HomeIcon',
                label: 'dashboard',
                path: 'dashboard'
            },
        ]
    }
]

export default Menus