jQuery(document).ready(function ($) {
    $('body').wpSuperSnow({
        flakes: ['heheda/image/007.png', 'heheda/image/006.png', 'heheda/image/004.png',
            'heheda/image/005.png', 'heheda/image/001.png', 'heheda/image/003.png',
            'heheda/image/002.png', 'heheda/image/008.png'
        ],
        totalFlakes: '100',
        zIndex: '999999',
        maxSize: '30',
        maxDuration: '20',
        useFlakeTrans: false
    });
});