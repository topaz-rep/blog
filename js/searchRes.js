const outputField = document.getElementById("searcher-results");

let documents = [
    {
        id : '1',
        title : '"Спи міцно, моє будівництво" - Шеррі Даскі Рінкер та Том Ліхтенгелд',
        content : 'Вечером все машинки на строительной площадке заканчивают свои важные дела и готовятся ко сну. А с ними и Ваш малыш :-) Я долго    думала покупать эту книгу или нет. Не смотря на её огромную популярность, попадались и отзывы что она совершенно обычная и детей никак не зацепила. Но любовь сынули к строительной технике была столь высока, и 90% отзывов были настолько восторженными, что я решила рискнуть. И в итоге с 1,7 лет мы больше трех месяцев не ложились спать без этой книги. Приходилось даже прятать. Я до сих пор помню её наизусть :-) Страсти улеглись где-то после двух. Но мы нашли новый "засыпательный" хит',
        tags : 'Стихи, 1-3 лет, Книга перед сном',
        imgsrc : 'img/book-sleep-tight.jpg'
    },
    {
        id : '2',
        title : '"Всё о компьютерах и ... ноутбуках, планшетах, смартфонах" - изд.Робинс',
        content : 'Недавно к нам приехала новая книга от Usborne (в переводе издательства Робинс). Всё о компьютерах и ноутбуках, планшетах, смартфонах. Я бы рекомендовала её младшим школьникам - 6-10 лет. Хотя мы с сыном (4,10) уже начали её читать, но многое ему ещё не понятно. Книга красочная и очень интересная. Объясняет коротко основные понятия о компьютерах, программировании, интернете.',
        tags : 'Познавательное, 6-12 лет, Книги с окошками',
        imgsrc : 'img/book-about-pc.jpg'
    },
    {
        id : '3',
        title : '"Занимательная таблица умножения" - изд. Робинс',
        content : 'Учим таблицу умножения весело с очередным шедевром от Usborne (в переводе издательства Робинс). Я в своё время могла только мечтать о такой книге, когда учила унылую таблицу на обороте школьной тетрадки... И когда увидела её - не смогла устоять :-) Купили когда Жене было три - на вырост. С планами использовать в школе. Сейчас он сам достает Таблицу умножения раз в неделю, и открывая окошки читает в слух - "шесть умножить на три - будет восемнадцать". Действительно умножать он ещё не умет, пока только складывает хорошо, отнимает хуже. Но она на столько крутая, что я понимаю почему он её "читает" :-) Книга отличного качества, плотный картон, "не бумажные", а плотные окошки.',
        tags : 'Школьнику, 6-10 лет, Книги с окошками',
        imgsrc : 'img/book-multiplication-table.jpg'
    }
];

let idx = lunr(function () {
    this.use(lunr.multiLanguage('en', 'ru'));
    this.ref('id');
    this.field('title');
    this.field('content');
    this.field('tags');
    this.field('imgsrc');

    documents.forEach(function (doc) {
        this.add(doc);
    }, this);
});

if (localStorage.getItem("result") !== null) getResult(localStorage.getItem("result"));

const searchFld = document.getElementById("srch-fld");
const searchBtn = document.getElementById("srch-btn");

searchBtn.addEventListener("click", getstr);
searchFld.addEventListener("keyup", keyPressed);

function getstr() {
    getResult(document.getElementById("srch-fld").value);
}

function keyPressed(ev) {
    if (ev.keyCode === 13) {
        searchBtn.click();
    }
}

function getResult(searchStr) {
    // ev.preventDefault();
    localStorage.removeItem("result");
    if (searchStr.length === 0 || searchStr === '-') {
        outputField.innerText = 'Вы не ввели поисковую фразу';
    } else {
        const results = idx.search(searchStr);
        const resArr = [];
        outputField.innerText = "";
        if (results.length === 0) {
            outputField.innerText = "Ничего не найдено";
        } else {
            for (let i = 0; i < results.length; i++) resArr[i] = results[i].ref;
            outputField.innerHTML = "<p id=\"search-count\">Найдено: " + resArr.length + "</p><hr>";
        }
        for (let i = 0; i < resArr.length; i++) {
            for (let j = 0; j < documents.length; j++) {
                if (documents[j].id === resArr[i]) {
                    outputField.innerHTML += `
                        <article>
                            <h2 id="bookTitle">${documents[j].title}</h2>
                            <p class="tags" id="bookTags">${documents[j].tags}</p>
                            <div class="content-block">
                                <div>
                                    <img src="${documents[j].imgsrc}" alt="Картинка - Книга: Спи крепко..." />
                                </div>
                                <div>
                                    <p class="content" id="bookContent">${documents[j].content}</p>
                                </div>
                            </div>
                        </article>
                    `;
                }
            }
        }
    }
}