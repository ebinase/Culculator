$(function () {
    let pri, sec, operator;
    const disp = $('#disp');
    //現段階でアクティブな演算子のオブジェクトを格納。なければnullを代入。
    let activeOprator = null;
    let isShirtCut = false;

    //入力された数字を画面に出力
    $('.num').click(function () {
        let input = $(this).text();
        //画面の値が'0'または演算子キーを押した直後ならば書き換える。
        // そうでなければ文字を連結していく。
        let disp_num = disp.text();
        if (disp_num === '0' || activeOprator !== null){
            //0だったら基本的に書き換え。ただし、小数点のときは'0.'にする
            if(input === '.') {
                input = '0.'
            }
        } else {
            input = disp_num + input;
        }
        show(input);
        console.log('input：' + input);
        //数字の入力のときは必ず演算子を非アクティブ化
        if(activeOprator !== null) {
            activeOprator.removeClass('active');
            activeOprator = null;
        }
    });

    $('.operator').click(function () {
        //画面に表示している数字を第一項として登録
        pri = disp.text();
        //演算子を登録
        operator = $(this).attr('id');

        if(activeOprator !== null) {
            activeOprator.removeClass('active');
        }
        //アクティブな演算子キーを登録
        activeOprator = $(this);
        activeOprator.addClass('active');

        //'='のショートカットを解除
        isShirtCut = false;
    });

    $('#equal').click(function () {
        // 計算のために数値にキャスト
        if(isShirtCut) {
            sec = Number(sec);
            pri = Number(disp.text());
        } else {
            pri = Number(pri);
            sec = Number(disp.text());
        }

        //計算
        let result = culculate();
        show(result);
        console.log(pri + operator + sec + '=' + result);
        isShirtCut = true;
    });

    //todo:AC/Cの実装
    $('#clear').click(function () {
        pri = sec = operator = '';
        disp.text('0');
        isShirtCut = false;
        if(activeOprator !== null) {
            activeOprator.removeClass('active');
            activeOprator = null;
        }
    });

    $('#sign').click(function () {
        let disp_num = disp.text();
        if(disp_num !== '0'){
            if(disp_num.substr(0,1) === '-'){
                disp_num = disp_num.substr(1);
            } else {
                disp_num = '-' + disp_num;
            }
            disp.text(disp_num);
        }
    });

    $('#percent').click(function () {
        let disp_num = disp.text();
        if(disp_num !== '0'){
            disp_num = Number(disp_num) * 0.01;
        }
        disp.text(disp_num);
    });

    function show(text) {
        // let output = text.toLocaleString('jp');
        disp.text(text);
    }

    function culculate() {
        let result;
        switch (operator) {
            case 'add':
                result = pri + sec;
                break;
            case 'sub':
                result = pri - sec;
                break;
            case 'mul':
                result = pri * sec;
                break;
            case 'div':
                result = pri / sec;
                break;
            default:
                result = '計算不可';
        }
        return result;
    }
});