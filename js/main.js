// Сброс выбраного файла и кнопки при загрузке страницы
document.onreadystatechange = function () {
    clearLog();
    document.getElementById("file-upload-form").reset()
}

// Создание ссылки на выбраный файл
const downloadURL = (data, fileName) => {
    const a = document.createElement("a");
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style.display = "none";
    a.click();
    a.remove();
};

// Вывод текста в текст бокс
const appendLog = (line) => {
    logBox.value += line;
}

// Очиска текст бокса
const clearLog = () => {
    const logBox = document.getElementById("logBox");
    logBox.value = "";
}

// Скачивание готового файла
const downloadBlob = (data, fileName, mimeType) => {
    const blob = new Blob([data], {
        type: mimeType,
    });

    const url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

const worker = new Worker("./js/worker.js");

// Нажатие кнопки начатия процесса
document
    .getElementById("file-upload-form")
    .addEventListener("submit", function (evt) {
        evt.preventDefault();
        const process_btn = document.getElementById("process-btn");
        process_btn.innerText = "⚙️Processing...";
        process_btn.disabled = true;

        const file = document.getElementById("file-upload-input").files[0];
        clearLog();
        appendLog("[+] Please stand by...\n")

        onmessage = (evt) => {
            const message = evt.data;
            switch (message["type"]) {
                case "file": {
                    const outFile = message["value"];
                    if (outFile.length == 0) {
                        appendLog("[!] Extraction failed");
                    }
                    else {
                        appendLog("[+] Extraction completed successfully, downloading zip");
                        downloadBlob(outFile, file.name + "_extracted.zip", "application/octet-stream");
                    }
                    process_btn.innerText = "⚙️Process";
                    process_btn.disabled = false;
                    break;
                }
                case "log": {
                    appendLog(message["value"]);
                    break;
                }
            }
        };
        postMessage(file);
    });
;
