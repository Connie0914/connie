const quiz = [
    {
        question: '手首につけるアクセサリーはブレスレットといいますが、足首につけるアクセサリーは何というでしょう？',
        answers: [
            'ゴブレット', 
            'ギムレット', 
            'ラクレット',
            'アンクレット'
        ],
        correct: 'アンクレット'
    }, {
        question: 'ファイナルファンタジーⅩの主人公の名前は？',
        answers: [
            'クラウド', 
            'ティーダ', 
            'セシル',
            'ユウナ'
        ],
        correct: 'ティーダ'
    }, {
        question: 'ゲーム市場、最も売れたゲーム機は次の内どれ？',
        answers: [
            'スーパーファミコン', 
            'プレイステーション２', 
            'ニンテンドースイッチ',
            'ニンテンドーDS'
        ],
        correct: 'ニンテンドーDS'
    }
];
const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName('button');
const buttonLength = $button.length;

//? クイズの問題文、選択肢を定義
const setupQuiz = () => {
    document.getElementById('js-question').textContent = quiz[quizIndex].question;
    let buttonIndex = 0;
    while(buttonIndex < buttonLength){
        $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
        buttonIndex++;
    }
};
setupQuiz();

const clickHandler = (e) => {
    if(quiz[quizIndex].correct === e.target.textContent){
        window.alert('正解！');
        score++;
    } else {
        window.alert('不正解！');
    }

    quizIndex++;

    if(quizIndex < quizLength) {
        //問題数がまだあればこちらを実行
        setupQuiz();
    } else {
        //問題数がもうなければこちらを実行
        window.alert('終了！あなたの正解数は' + score + '/' + quizLength + 'です！');
    }
};

//? ボタンをクリックしたら正誤判定
let handlerIndex = 0;
while (handlerIndex < buttonLength) {
    $button[handlerIndex].addEventListener('click', (e) => {
        clickHandler(e);
    });
    handlerIndex++;
}
