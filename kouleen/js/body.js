jQuery(document).ready(function ($) {
    $('body').wpSuperSnow({
        flakes: ['kouleen/image/007.png', 'kouleen/image/006.png', 'kouleen/image/004.png',
            'kouleen/image/005.png', 'kouleen/image/001.png', 'kouleen/image/003.png',
            'kouleen/image/002.png', 'kouleen/image/008.png'
        ],
        totalFlakes: '100',
        zIndex: '999999',
        maxSize: '30',
        maxDuration: '20',
        useFlakeTrans: false
    });
});