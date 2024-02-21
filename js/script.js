$(function () {
    $('.carousel').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        speed: 1000,
        arrows: false,
        fade: true,        
    });

    $('a').mouseover(function () {
        $(this).animate({
            opacity: 0.6,
        }, 300);
    });

    $('a').mouseout(function () {
        $(this).animate({
            opacity: 1.0,
        }, 300);
    });

    $('a[href^="#"]').click(function () {
        const speed = 500;
        const href = $(this).attr('href');
        let $target;
        if (href == '#') {
            $target = $('html');
        } else {
            $target = $(href);
        }
        const position = $target.offset().top;
        $('html, body').animate({
            'scrollTop': position
        }, speed, 'swing');
        return false;
    });

    $(window).scroll(function () {
        const scrollAmount = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.fade').each(function () {
            const position = $(this).offset().top;
            if (scrollAmount > position - windowHeight + 100) {
                $(this).addClass('fade-in');
            }
        });
    });

    $('.section4-flex img').click(function () {
        const imgSrc = $(this).attr('src');
        $('.bigImg').attr('src', imgSrc);
        $('.section4BigImg').fadeIn();
        return false
    });

    $('.closeBtn').click(function () {
        $('.section4BigImg').fadeOut();
        return false
    });

    $('.section6Submit').click(function (event) {
        event.preventDefault();
        let result = inputCheck();

        let error = result.error;
        let message = result.message;

        if (error == false) {
            $ajax({
                url: '',
                type: 'POST',
                dataType: $('#form').serialaze(),
                success: function (result) {
                    alert('応募が完了しました。')
                },
                error: function(xhr,resp,text) {
                    alert('応募が完了していません。')
                }
            })
        } else {
            alert(message);
        }
    });

    $('#name').blur(function () {
        inputCheck();
    });
    $('#furigana').blur(function () {
        inputCheck();
    });
    $('birthday').blur(function () {
        inputCheck();
    });
    $('#email').blur(function () {
        inputCheck();
    });
    $('#tel').blur(function () {
        inputCheck();
    });

    function inputCheck() {
        let result;
        let message = '';
        let error = false;

        if($('#name').val() == '') {
            $('#name').css('background-color','#f79999');
            error = true;
            message += 'お名前を入力してください。\n';
        } else {
            $('#name').css('background-color','#1c1c1c');
        }

        if($('#furigana').val() == '') {
            $('#furigana').css('background-color','#f79999');
            error = true;
            message += 'フリガナを入力してください。\n';
        } else {
            $('#furigana').css('background-color','#1c1c1c');
        }

        if($('#birthday').val() == '') {
            $('#birthday').css('background-color','#f79999');
            error = true;
            message += '生年月日を入力してください。\n';
        } else {
            $('#birthday').css('background-color','#1c1c1c');
        }
        
        if($('#email').val() == '' ||
         $('#email').val().indexOf('@') == -1 || 
         $('#email').val().indexOf('.') == -1) {
            $('#email').css('background-color','#f79999');
            error = true;
            message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
        } else {
            $('#email').css('background-color','#1c1c1c');
        }

        if($('#tel').val() == '' ||
         Number.isInteger(Number($('#tel').val())) == false) {
            $('#tel').css('background-color','#f79999');
            error = true;
            message += '電話番号を半角数字で入力してください。\n';
        } else {
            $('#tel').css('background-color','#1c1c1c');
        }

        if(error == true) {
            $('.section6Submit').attr('src','images/応募ボタングレー.png')
        } else {
            $('.section6Submit').attr('src','images/応募ボタン.png')
        }

        result = {
            error: error,
            message: message,
        }
        return result;
    }
    
});