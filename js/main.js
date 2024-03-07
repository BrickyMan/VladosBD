const terminal = document.querySelector('#terminal');
let currentPath = ['C:', 'Users', 'S4MURA1'];
let requestStory = [];
let requestStoryIndex = -1;

// Кирпич - 0451
// Вантус - А нафиг?
// Олэсд - *вздох*
// Петян - Dying Light 2
// Рина - Когда-нибудь
// Лёня - Андрей Кобин
// Кетрой - Цикады
// Слава - 

// __________
// |    |   |
// |    |  _| 
// |    | |_|
// |____| \_|
// |    | ,_|x
// |    |-'-|
// |    |   |
// |____|*__|

let fileSystem = {
    'C:': {
        'Users': {
            'S4MURA1': {
                'note.txt': 'Что-то я стал забывать пароли, надо бы уже дописать менеджер паролей, а то идея раздать по паролю всем корешам какая-то сомнительная\nЗЫ: самый простой пароль, от админки, у Кирпича, этот он точно не сможет забыть',
                'zombie.py': 'while True:\n\tprint("Brainssss!")',
                'password_manager': {
                    'main.py': 'import PyQt5\nprint("Ебучий менеджер паролей")\n#Надо запушить',
                    'passwords.json': '{\n\t"loli-hentai.com": "soso4ek_$amuraya"\n}'
                }
            },
            'Admin': {
                'la_nevera.txt': 'Дорого, но руки в кулер вроде не суют <a href="https://remontholodilnikov.ru/" target="_blank">remontholodilnikov.ru</a><br>А у этих бригада на субару гоняет зато <a href="https://holodilchic.ru/" target="_blank">holodilchic.ru</a>',
                'no_entry': {
                    'serious_squad.txt': '- Э-э-э, подтвердите, вам нужен инженер?\n- Да. Ещё один\n- Наху.. Ой, в смысле зачем? *смех* Зачем вам второй инженер?\n- Тебя ебёт? В смысле, нужен. *смех*\n- Принял! Дислаци... Дислацаца *смех* *хрип* Подберите меня! *раздавлен вертолётом* Ты дебил! ТЫ ДЕБИЛ!\n- *цыканье* Иди в жопу.\n\n\nЗЫ: А это достаточно очевидная подсказка? *кашель*',
                    'staff_only': {
                        'puzzle.txt': '-- Детская загадка --\n\nСколько грыж, столько раз за него и пьём.\n\nнʁшaU',
                        'NO_WAY': {
                            'debts.txt': 'Я должен:\n- помыть посуду\n- получить аргентинский паспорт\n- сделать двуху с подбива\n- пройти Ghost of Tsushima\n- выпить пива (сейчас)\n\nМне должны:\n- баханди\nа кто должен-то?',
                            'final_warning': {
                                'da_ya_thang.txt': 'В мире автомобильных технологий и механики каждая деталь играет свою роль в обеспечении безопасности и комфорта вождения. Одним из таких ключевых компонентов автомобиля ВАЗ является дрогвенстер – элемент, который оказывает огромное влияние на управляемость и стабильность автомобиля. Не всегда этот важный компонент получает достаточно внимания, но восстановление его функциональности – важная задача для любого автолюбителя, стремящегося к оптимальной производительности своего автомобиля.\n\n                                Что такое дрогвенстер и зачем он нужен?\n\n                                Дрогвенстер – это элемент подвески, который является чрезвычайно важным для стабильности автомобиля при движении по неровной дороге или поворотах. Он обеспечивает плавность и точность поворотов, а также помогает удерживать заднюю ось автомобиля на месте во время движения. Как видите, без этого элемента вождение становится менее предсказуемым и безопасным.',
                                'you_shall_not_pass': {
                                    'centre_colour.txt': 'Look at <a href="https://img.freepik.com/premium-photo/water-plastic-bottles-isolated-on-white-with-clipping-path_105428-2911.jpg" target="_blank">this</a> gentleman.',
                                    'nothin_special': {
                                        'map.txt': '3=m=mэ (-o-#)',
                                        'blowjob.txt': "__________\n|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|\n|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;_|&nbsp;\n|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|_|\n|____|&nbsp;\\_|\n|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;,_|x\n|&nbsp;&nbsp;&nbsp;&nbsp;|-'-|\n|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;|\n|____|*__|"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        'horse_porn.link': '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">https://rt.pornhub.com/view_video.php?viewkey=dQw4w9WgXcQ</a>'
    }
}

function getPath() {
    return currentPath.join('\\');
}

function readPath(path = currentPath) {
    let current = fileSystem;
    for (let folder of path) {
        if (current[folder]) {
            current = current[folder];
        } else {
            return null; // Если путь недопустимый
        }
    }
    return current;
}

function requestPassword(callback, dir, correctPassword) {
    let input = document.querySelector(".terminal-input.active");
    let prevPath = input.querySelector(".terminal-prefix").innerHTML;
    let request = input.querySelector("input").value;
    // Удаление input
    input.remove();
    terminal.innerHTML += `
        <div class="terminal-input active">
            <p class="terminal-prefix">${prevPath}</p>
            <input class="terminal-request" value="${request}">
        </div>
        <div class="password-input">
            <p class="terminal-output">Введите пароль:</p>
            <input class="active" type="text" onkeydown="passwordHandle(event, ${callback}, '${dir}', '${correctPassword}');">
        </div>
    `
    setInputFocus();
}

function passwordHandle(event, callback, dir, correctPassword) {
    if (event.key == 'Enter') {
        let password = document.querySelector(".password-input input.active").value;
        callback(password, dir, correctPassword);
    }
}

function showAnswer(answer = '') {
    let input = document.querySelector(".terminal-input.active");
    let prevPath = input.querySelector(".terminal-prefix").innerHTML;
    let request = input.querySelector("input").value;
    answer = answer.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    // Удаление input
    input.remove();
    terminal.innerHTML += `
        <div class="terminal-input">
            <p class="terminal-prefix">${prevPath}</p>
            <p class="terminal-request">${request}</p> 
        </div>
        <p class="terminal-output">${answer}</p>
        <div class="terminal-input active">
            <p class="terminal-prefix">${getPath()}></p>
            <input type="text" class="active" onkeydown="inputHandle(event);">
        </div>
    `;
    setInputFocus();
}

function setInputFocus() {
    terminal.scrollTo(0, terminal.scrollHeight);
    let input = document.querySelector("input.active");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
}

function inputHandle(event) {
    if (event.key == 'Enter') {
        event.preventDefault();
        let userRequest = event.target.value.trim();
        if (userRequest != '') {
            // Добавление в начало истории
            requestStory.unshift(userRequest);
            userRequest = userRequest.split(' ');
            let command = userRequest[0];
            if (command == 'help') {
                showAnswer(data.help);
            }
            else if (command == 'cd') {
                commandCd(userRequest[1]);
            }
            else if (command == 'full') {
                commandFullscreen(userRequest[1]);
            }
            else if (command == 'clear') {
                commandClear();
            }
            else if (command == 'dir') {
                commandDir();
            }
            else if (command == 'open') {
                commandOpen(userRequest[1]);
            }
            else {
                showAnswer(`Неизвестная команда ${userRequest[0]}`);
            }
        }
    }
    else if (event.key == 'ArrowUp') {
        event.preventDefault();
        if (requestStoryIndex < requestStory.length - 1) {
            requestStoryIndex++;
            event.target.value = requestStory[requestStoryIndex];
        }
    }
    else if (event.key == 'ArrowDown') {
        event.preventDefault();
        if (requestStoryIndex > 0) {
            requestStoryIndex--;
            event.target.value = requestStory[requestStoryIndex];
        }
    }
    else {
        requestStoryIndex = -1;
    }
}

fetch('js/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка загрузки файла');
        }
      return response.json();
    })
    .then(jsonData => {
        data = jsonData;
        main();
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });

function main() {
    console.log(readPath());
    terminal.onclick = () => {
        setInputFocus();
    }
}

function openWithPassword(dirPar, correctPasswordPar) {
    requestPassword((password, dir, correctPassword) => {
        document.querySelector('.password-input').remove();
        if (password == correctPassword) {
            showAnswer(`Введите пароль: ${password}\nПароль принят`)
            commandCd(dir, true);
        }
        else {
            showAnswer(`Введите пароль: ${password}\nНеверный пароль`);
        }
    }, dirPar, correctPasswordPar);
}

function commandCd(request, allowed = false) {
    if (request == '..' && currentPath.length > 1) {
        currentPath.pop();
        showAnswer();
    }
    else {
        let path = readPath([...currentPath, request]);
        if (path && !request.includes(".")) {
            if (request == "Admin" && !allowed) {
                openWithPassword("Admin", "0451");
                return;
            }
            else if (request == "no_entry" && !allowed) {
                openWithPassword("no_entry", "А нафиг?");
                return;
            }
            else if (request == "staff_only" && !allowed) {
                openWithPassword("staff_only", "*вздох*");
                return;
            }
            else if (request == "NO_WAY" && !allowed) {
                openWithPassword("NO_WAY", "Dying Light 2");
                return;
            }
            else if (request == "final_warning" && !allowed) {
                openWithPassword("final_warning", "Когда-нибудь");
                return;
            }
            else if (request == "you_shall_not_pass" && !allowed) {
                openWithPassword("you_shall_not_pass", "Андрей Кобин");
                return;
            }
            else if (request == "nothin_special" && !allowed) {
                openWithPassword("nothin_special", "Цикады");
                return;
            }
            currentPath.push(request);
            showAnswer();
        }
        else {
            showAnswer('Директория не существует');
        }
    } 
    
}

function commandOpen(fileName) {
    if (fileName && fileName.includes('.')) {
        let file = readPath([...currentPath, fileName]);
        if (file) {
            showAnswer(file);
        }
        else {
            showAnswer('Файл не существует');
        }
    }
}

function commandFullscreen(arg = 'on') {
    if (arg == 'on') {
        document.documentElement.requestFullscreen();
        showAnswer(`Полноэкранный режим включен`);
    }
    else if (arg == 'off') {
        document.exitFullscreen();
        showAnswer(`Полноэкранный режим выключен`);
    }
    else {
        showAnswer(`Некорректный аргумент: ${request}\nАргументы: on, off`);
    }
}

function commandDir() {
    let answer = '';
    for (let element of Object.keys(readPath())) {
        if (element.includes('.')) {
            answer += `${element} - file\n`;
        }
        else {
            answer += `${element} - folder\n`;
        }
    }
    showAnswer(answer);
}

function commandClear() {
    terminal.innerHTML = `
        <div class="terminal-input active">
            <p class="terminal-prefix">${getPath()}></p>
            <input type="text" class="active" onkeydown="inputHandle(event);">
        </div>
    `;
    setInputFocus();
}