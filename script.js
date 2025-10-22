// Eco Matrix Background Effect
        function initMatrixEffect() {
            const canvas = document.getElementById('matrix-canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Símbolos relacionados à sustentabilidade
            const ecoSymbols = "🌱🌿🍃🌳🌲🌴🌵🌾🌻🌺🌸🌼🌷🌹💚♻️🌍🌎🌏💧⚡🔋☀️🌤️⭐✨💫🦋🐝🐛🌈🔆💎";
            const matrix = "SUSTENTABILIDADEENERGIAAGUAVIDACLIMAFUTUROPLANETANATUREZAVERDE";
            const matrixArray = matrix.split("");
            const symbolArray = [...ecoSymbols];
            
            const fontSize = 12;
            const columns = canvas.width / fontSize;
            
            const drops = [];
            const colors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#059669', '#047857'];
            
            for(let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
            
            function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.font = fontSize + 'px monospace';
                
                for(let i = 0; i < drops.length; i++) {
                    // Alternar entre símbolos eco e letras
                    const useSymbol = Math.random() > 0.7;
                    const text = useSymbol ? 
                        symbolArray[Math.floor(Math.random() * symbolArray.length)] :
                        matrixArray[Math.floor(Math.random() * matrixArray.length)];
                    
                    // Cor aleatória da paleta verde
                    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                    
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if(drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
                        drops[i] = 0;
                    }
                    drops[i]++;
                }
            }
            
            setInterval(draw, 50);
        }

        // Dados dos jogos - 17 opções para variar
        const odsData = [
            { id: 1, title: "Erradicação da Pobreza", image: "img/ods1.jpg" },
            { id: 2, title: "Fome Zero", image: "img/ods2.jpg" },
            { id: 3, title: "Saúde e Bem-Estar", image: "img/ods3.webp" },
            { id: 4, title: "Educação de Qualidade", image: "img/ods4.jpg" },
            { id: 5, title: "Igualdade de Gênero", image: "img/ods5.jpg" },
            { id: 6, title: "Água Potável", image: "img/ods6.webp" },
            { id: 7, title: "Energia Limpa", image: "img/ods7.png" },
            { id: 8, title: "Trabalho Decente", image: "img/ods8.webp" },
            { id: 9, title: "Indústria e Inovação", image: "img/ods9.png" },
            { id: 10, title: "Redução das Desigualdades", image: "img/ods10.png" },
            { id: 11, title: "Cidades Sustentáveis", image: "img/ods11.jpg" },
            { id: 12, title: "Consumo Responsável", image: "img/ods12.jpg" },
            { id: 13, title: "Ação Climática", image: "img/ods13.jpg" },
            { id: 14, title: "Vida na Água", image: "img/ods14.png" },
            { id: 15, title: "Vida Terrestre", image: "img/ods15.png" },
            { id: 16, title: "Paz e Justiça", image: "img/ods16.jpg" },
            { id: 17, title: "Parcerias", image: "img/ods17.jpg" }
        ];

        
        // Variáveis globais
        let currentGame = 'game-menu';
        let memoryCards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let memoryAttempts = 0;

        // Funções de navegação
        function showGame(gameId) {
            document.querySelectorAll('.game-section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.getElementById(gameId).classList.add('active');
            currentGame = gameId;
            
            // Inicializar o jogo específico automaticamente
            switch(gameId) {
                case 'memory-game':
                    startMemoryGame();
                    break;
                case 'quiz-game':
                    startQuizGame();
                    break;
                case 'word-search':
                    startWordSearch();
                    break;
                case 'guess-ods':
                    startGuessGame();
                    break;
                case 'myth-truth':
                    startMythGame();
                    break;
                case 'eco-calculator':
                    document.getElementById('impact-results').classList.add('hidden');
                    break;
            }
        }

        function showGameMenu() {
            showGame('game-menu');
        }

        // JOGO DA MEMÓRIA
        function startMemoryGame() {
            const selectedOds = odsData.slice(0, 8);
            const cards = selectedOds.map(ods => ({ id: ods.id, image: ods.image }));
            memoryCards = [...cards, ...cards].sort(() => Math.random() - 0.5);
            flippedCards = [];
            matchedPairs = 0;
            memoryAttempts = 0;
            
            updateMemoryScore();

            const container = document.getElementById('ods-container');
            container.innerHTML = ''; // Limpa qualquer conteúdo anterior

        odsData.forEach(ods => {
            const jogoDiv = document.createElement('div'); // Cria um contêiner para o quadrado
            jogoDiv.classList.add('memoriajogo'); // Adiciona a classe 'jogo'

            const img = document.createElement('img');
            img.src = ods.image;
            img.alt = ods.title;
            img.classList.add('imagem-ods'); // Adiciona a classe para estilização
            
            jogoDiv.appendChild(img); // Adiciona a imagem ao quadrado
            container.appendChild(jogoDiv); // Adiciona o quadrado ao contêiner
        });

        // Iniciar o jogo da memória ao carregar a página
        window.onload = startMemoryGame;
            
            const grid = document.getElementById('memory-grid');
            grid.innerHTML = '';
            
            memoryCards.forEach((card, index) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card-memory h-16 w-16 rounded-xl px-2 py-2 text-center justify-center mb-4 shadow-lg border-radius-15px cursor-pointer text-2xl border-green-800';
                cardElement.dataset.index = index;
                cardElement.dataset.id = card.id;
                cardElement.innerHTML = '?';
                cardElement.addEventListener('click', flipMemoryCard);
                grid.appendChild(cardElement);
            });
        }

        function flipMemoryCard(e) {
            const card = e.target;
            const index = parseInt(card.dataset.index);
            
            if (flippedCards.length < 2 && !flippedCards.includes(index) && !card.classList.contains('matched')) {
                const cardData = memoryCards[index];
                card.innerHTML = `<img src="${cardData.image}" alt="Card ${cardData.id}" style="width: 100%; height: auto;">`; // Exibe a imagem                
                flippedCards.push(index);
                
                if (flippedCards.length === 2) {
                    memoryAttempts++;
                    updateMemoryScore();
                    setTimeout(checkMemoryMatch, 1000);
                }
            }
        }

        function checkMemoryMatch() {
            const [first, second] = flippedCards;
            const firstCard = document.querySelector(`[data-index="${first}"]`);
            const secondCard = document.querySelector(`[data-index="${second}"]`);
            
            if (memoryCards[first].id === memoryCards[second].id) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                matchedPairs++;
                updateMemoryScore();
                
                if (matchedPairs === 8) {
                    setTimeout(() => {
                        showMemoryGameResults();
                    }, 500);
                }
            } else {
                firstCard.innerHTML = '?';
                secondCard.innerHTML = '?';
                firstCard.style.backgroundColor = '';
                secondCard.style.backgroundColor = '';
                firstCard.style.color = '';
                secondCard.style.color = '';
            }
            
            flippedCards = [];
        }

        function showMemoryGameResults() {
            let performance, message, emoji;
            
            if (memoryAttempts <= 12) {
                performance = "EXCEPCIONAL";
                message = "Memória incrível! Você é um mestre dos ODS!";
                emoji = "🏆";
            } else if (memoryAttempts <= 20) {
                performance = "EXCELENTE";
                message = "Muito bem! Sua concentração é impressionante!";
                emoji = "🌟";
            } else if (memoryAttempts <= 30) {
                performance = "BOM";
                message = "Bom trabalho! Continue praticando!";
                emoji = "👍";
            } else {
                performance = "PODE MELHORAR";
                message = "Continue tentando! A prática leva à perfeição!";
                emoji = "💪";
            }
            
            const efficiency = Math.round((8 / memoryAttempts) * 100);
            
            alert(`${emoji} PARABÉNS! JOGO DA MEMÓRIA CONCLUÍDO!\n\n` +
                  `🎯 Performance: ${performance}\n` +
                  `🔢 Tentativas: ${memoryAttempts}\n` +
                  `⚡ Eficiência: ${efficiency}%\n` +
                  `🏅 Pares encontrados: 8/8\n\n` +
                  `💭 ${message}`);
        }

        function updateMemoryScore() {
            document.getElementById('memory-score').textContent = matchedPairs;
            document.getElementById('memory-attempts').textContent = memoryAttempts;
        }

        
        // CALCULADORA DE IMPACTO
        // Function to generate personalized water tips
        function getWaterTip(minutes, baths, yearlyWaterUse) {
            if (minutes <= 5) {
                return "Excelente! Você já tem banhos bem eficientes. Continue assim!";
            } else if (minutes <= 10) {
                const savings = (2 * baths * 12 * 365);
                return `Reduzir apenas 2 minutos no banho economizaria ${savings.toLocaleString()} litros por ano!`;
            } else if (minutes <= 15) {
                const savings = (5 * baths * 12 * 365);
                return `Que tal tentar banhos de 10 minutos? Você economizaria ${savings.toLocaleString()} litros por ano!`;
            } else {
                const savings = ((minutes - 10) * baths * 12 * 365);
                return `Banhos de 10 minutos economizariam ${savings.toLocaleString()} litros por ano - uma grande diferença!`;
            }
        }

        // Impact calculator
        function calculateImpact() {
            const baths = parseInt(document.getElementById('baths').value) || 0;
            const minutes = parseInt(document.getElementById('minutes').value) || 0;
            const distance = parseInt(document.getElementById('distance').value) || 0;
            const transport = document.getElementById('transport').value;
            const resultDiv = document.getElementById('impact-result');
            
            // Cálculos de água
            const dailyWaterUse = baths * minutes * 12; // 12 litros por minuto
            const yearlyWaterUse = dailyWaterUse * 365;
            const poolsEquivalent = Math.round(yearlyWaterUse / 50000); // piscinas olímpicas
            
            // Cálculos de transporte (CO2 por km)
            const transportEmissions = {
                'carro': 0.12, // kg CO2 por km
                'onibus': 0.05,
                'bicicleta': 0,
                'metro': 0.03,
                'moto': 0.08,
                'pe': 0,
                'uber': 0.15
            };
            
            const dailyCO2 = distance * (transportEmissions[transport] || 0);
            const yearlyCO2 = dailyCO2 * 250; // dias úteis por ano
            const treesNeeded = Math.round(yearlyCO2 / 22); // árvores necessárias para compensar
            
            // Mensagens por tipo de transporte
            const transportMessages = {
                'carro': 'Considere usar transporte público!',
                'onibus': 'Ótima escolha! Transporte coletivo reduz emissões.',
                'bicicleta': 'Excelente! Zero emissões e exercício físico.',
                'metro': 'Muito bom! Transporte eficiente e limpo.',
                'moto': 'Considere alternativas mais sustentáveis.',
                'pe': 'Perfeito! Zero emissões e muito saudável.',
                'uber': 'Tente usar transporte público quando possível.'
            };
            
            resultDiv.innerHTML = `
                <h3 class="font-bold text-green-400 mb-3">Seu Impacto Anual:</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div class="p-3 rounded">
                        <p class="font-semibold text-blue-500">💧 Água no Banho</p>
                        <p><strong>${yearlyWaterUse.toLocaleString()}</strong> litros/ano</p>
                        <p class="text-xs text-blue-600">≈ ${poolsEquivalent} piscinas olímpicas</p>
                    </div>
                    <div class="p-3 rounded">
                        <p class="font-semibold text-orange-500">🚗 Transporte</p>
                        <p><strong>${yearlyCO2.toFixed(1)}</strong> kg CO₂/ano</p>
                        <p class="text-xs text-orange-400">≈ ${treesNeeded} árvores para compensar</p>
                    </div>
                </div>
                <div class="mt-3 p-3 rounded">
                    <p class="text-sm text-yellow-300">
                        💧 <strong>Dica Água:</strong> ${getWaterTip(minutes, baths, yearlyWaterUse)}
                    </p>
                </div>
                ${transport ? `<div class="mt-2 p-3 rounded">
                    <p class="text-sm text-green-500">
                        🚲 <strong>Transporte:</strong> ${transportMessages[transport]}
                    </p>
                </div>` : ''}
                <p class="text-sm text-green-400 mt-2 text-center font-medium">Continue assim! Cada ação conta para os ODS! 🌱</p>
            `;
            resultDiv.classList.remove('hidden');
        }


        // Quiz dos ODS - 17 perguntas completas sobre todos os ODS        
        const allQuizQuestions = [
            {
                question: "Qual é o principal objetivo do ODS 1 - Erradicação da Pobreza?",
                correctAnswer: "Acabar com a pobreza extrema em todas as suas formas",
                wrongAnswers: ["Reduzir apenas a pobreza urbana", "Focar só na distribuição de renda", "Eliminar apenas a fome"]
            },
            {
                question: "O ODS 2 - Fome Zero visa principalmente:",
                correctAnswer: "Acabar com a fome e garantir segurança alimentar",
                wrongAnswers: ["Apenas aumentar a produção agrícola", "Focar só na desnutrição infantil", "Reduzir preços dos alimentos"]
            },
            {
                question: "Qual é o foco do ODS 3 - Saúde e Bem-Estar?",
                correctAnswer: "Assegurar vida saudável e bem-estar para todos",
                wrongAnswers: ["Apenas combater doenças infecciosas", "Focar só na saúde mental", "Reduzir custos hospitalares"]
            },
            {
                question: "O ODS 4 - Educação de Qualidade busca:",
                correctAnswer: "Educação inclusiva, equitativa e de qualidade para todos",
                wrongAnswers: ["Apenas alfabetização básica", "Focar só no ensino superior", "Reduzir custos educacionais"]
            },
            {
                question: "Qual é o objetivo do ODS 5 - Igualdade de Gênero?",
                correctAnswer: "Alcançar igualdade de gênero e empoderar mulheres",
                wrongAnswers: ["Apenas aumentar salários femininos", "Focar só na educação das meninas", "Reduzir diferenças salariais"]
            },
            {
                question: "O ODS 6 - Água Potável e Saneamento visa:",
                correctAnswer: "Garantir água potável e saneamento para todos",
                wrongAnswers: ["Apenas construir mais reservatórios", "Focar só na qualidade da água", "Reduzir consumo de água"]
            },
            {
                question: "Qual é o foco do ODS 7 - Energia Limpa e Acessível?",
                correctAnswer: "Energia renovável, confiável e moderna para todos",
                wrongAnswers: ["Apenas energia solar", "Focar só na eficiência energética", "Reduzir custos de energia"]
            },
            {
                question: "O ODS 8 - Trabalho Decente e Crescimento Econômico busca:",
                correctAnswer: "Crescimento econômico sustentável e trabalho decente",
                wrongAnswers: ["Apenas aumentar o PIB", "Focar só na criação de empregos", "Reduzir desemprego urbano"]
            },
            {
                question: "Qual é o objetivo do ODS 9 - Indústria, Inovação e Infraestrutura?",
                correctAnswer: "Infraestrutura resiliente e industrialização sustentável",
                wrongAnswers: ["Apenas construir mais fábricas", "Focar só em tecnologia", "Reduzir custos industriais"]
            },
            {
                question: "O ODS 10 - Redução das Desigualdades visa:",
                correctAnswer: "Reduzir desigualdades dentro e entre países",
                wrongAnswers: ["Apenas igualar salários", "Focar só na desigualdade racial", "Reduzir diferenças regionais"]
            },
            {
                question: "Qual é o foco do ODS 11 - Cidades e Comunidades Sustentáveis?",
                correctAnswer: "Cidades inclusivas, seguras, resilientes e sustentáveis",
                wrongAnswers: ["Apenas melhorar o transporte público", "Focar só na habitação", "Reduzir poluição urbana"]
            },
            {
                question: "O ODS 12 - Consumo e Produção Responsáveis busca:",
                correctAnswer: "Padrões sustentáveis de consumo e produção",
                wrongAnswers: ["Apenas reduzir o consumo", "Focar só na reciclagem", "Diminuir a produção industrial"]
            },
            {
                question: "Quantos são os Objetivos de Desenvolvimento Sustentável?",
                correctAnswer: "17 objetivos",
                wrongAnswers: ["15 objetivos", "20 objetivos", "12 objetivos"]
            },
            {
                question: "O ODS 13 - Ação contra a Mudança Global do Clima visa:",
                correctAnswer: "Combater mudanças climáticas e seus impactos",
                wrongAnswers: ["Apenas reduzir emissões de CO2", "Focar só em energias renováveis", "Diminuir o aquecimento global"]
            },
            {
                question: "Qual é o objetivo do ODS 14 - Vida na Água?",
                correctAnswer: "Conservar oceanos, mares e recursos marinhos",
                wrongAnswers: ["Apenas reduzir poluição marinha", "Focar só na pesca sustentável", "Proteger apenas recifes de coral"]
            },
            {
                question: "O ODS 15 - Vida Terrestre busca:",
                correctAnswer: "Proteger ecossistemas terrestres e biodiversidade",
                wrongAnswers: ["Apenas plantar mais árvores", "Focar só na conservação de florestas", "Reduzir desmatamento urbano"]
            },
            {
                question: "Qual é o foco do ODS 16 - Paz, Justiça e Instituições Eficazes?",
                correctAnswer: "Sociedades pacíficas, justiça e instituições eficazes",
                wrongAnswers: ["Apenas reduzir criminalidade", "Focar só no sistema judiciário", "Diminuir conflitos internacionais"]
            }
        ];

        let currentQuizQuestions = [];
        let currentQuizQuestion = 0;
        let quizScore = 0;

        function startQuizGame() {
            currentQuizQuestion = 0;
            quizScore = 0;
            
            // Embaralhar todas as perguntas e selecionar 10 para esta rodada
            const shuffledQuestions = [...allQuizQuestions].sort(() => Math.random() - 0.5);
            currentQuizQuestions = shuffledQuestions.slice(0, 10);
            
            updateQuizDisplay();
            showNextQuizQuestion();
        }

        function showNextQuizQuestion() {
            if (currentQuizQuestion >= currentQuizQuestions.length) {
                showQuizResults();
                return;
            }

            const questionData = currentQuizQuestions[currentQuizQuestion];
            document.getElementById('quiz-question').textContent = questionData.question;
            
            // Criar array com todas as opções e embaralhar
            const allOptions = [questionData.correctAnswer, ...questionData.wrongAnswers];
            const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
            
            // Encontrar nova posição da resposta correta
            const correctIndex = shuffledOptions.indexOf(questionData.correctAnswer);
            
            const optionsContainer = document.getElementById('quiz-options');
            optionsContainer.innerHTML = '';
            
            shuffledOptions.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'quiz-option w-full p-4 rounded-lg text-left transition-all';
                button.textContent = option;
                button.onclick = () => answerQuiz(index, correctIndex);
                optionsContainer.appendChild(button);
            });
        }

        function answerQuiz(selectedIndex, correctIndex) {
            const options = document.querySelectorAll('.quiz-option');
            
            options.forEach((option, index) => {
                if (index === correctIndex) {
                    option.classList.add('correct');
                } else if (index === selectedIndex && index !== correctIndex) {
                    option.classList.add('incorrect');
                }
                option.onclick = null;
            });

            if (selectedIndex === correctIndex) {
                quizScore++;
            }

            currentQuizQuestion++;
            updateQuizDisplay();
            
            setTimeout(() => {
                showNextQuizQuestion();
            }, 2000);
        }

       function updateQuizDisplay() {
            document.getElementById('quiz-current').textContent = Math.min(currentQuizQuestion + 1, currentQuizQuestions.length);
            document.getElementById('quiz-score').textContent = quizScore;
        }

        function showQuizResults() {
            const percentage = (quizScore / currentQuizQuestions.length) * 100;
            let performance, message, emoji;
            
            if (percentage >= 90) {
                performance = "MESTRE DOS ODS";
                message = "Incrível! Você é um verdadeiro especialista em sustentabilidade!";
                emoji = "🏆";
            } else if (percentage >= 70) {
                performance = "MUITO BOM";
                message = "Excelente conhecimento! Continue assim!";
                emoji = "🌟";
            } else if (percentage >= 50) {
                performance = "BOM";
                message = "Bom trabalho! Continue estudando os ODS!";
                emoji = "👍";
            } else {
                performance = "PRECISA ESTUDAR MAIS";
                message = "Continue aprendendo sobre sustentabilidade!";
                emoji = "📚";
            }
            
            alert(`${emoji} PARABÉNS! QUIZ DOS ODS CONCLUÍDO!\n\n` +
                  `🎯 Performance: ${performance}\n` +
                  `✅ Acertos: ${quizScore}/${currentQuizQuestions.length}\n` +
                  `📊 Percentual: ${percentage.toFixed(1)}%\n` +
                  `🎓 Nível de conhecimento: ${getKnowledgeLevel(percentage)}\n\n` +
                  `💭 ${message}`);
        }

        function getKnowledgeLevel(percentage) {
            if (percentage >= 90) return "Especialista";
            if (percentage >= 70) return "Avançado";
            if (percentage >= 50) return "Intermediário";
            return "Iniciante";
        }

    
        // Caça-Palavras
        const allWordsPool = [
            'SUSTENTAVEL', 'ENERGIA', 'AGUA', 'EDUCACAO', 'SAUDE', 'TRABALHO', 'CLIMA', 'VIDA',
            'RECICLAGEM', 'RENOVAVEL', 'BIODIVERSIDADE', 'CARBONO', 'FLORESTA', 'OCEANO',
            'POLUICAO', 'CONSERVACAO', 'ECOLOGIA', 'PLANETA', 'FUTURO', 'NATUREZA',
            'VIDA', 'VERDE', 'LIMPO', 'PRESERVAR', 'PROTEGER', 'CUIDAR',
            'TERRA', 'CONSCIENTE', 'EQUILIBRIO', 'HARMONIA', 'INOVACAO',
            'TECNOLOGIA', 'SOLAR', 'EOLICA', 'OXIGENIO', 'BIOMASSA', 'GEOTERMIA',
            'EFICIENCIA', 'ECONOMIA', 'REDUCAO', 'REUTILIZAR', 'RECICLAR', 'REPENSAR'
        ];
        let wordsToFind = [];
        let wordSearchGrid = [];
        let foundWords = [];

        function startWordSearch() {
            foundWords = [];
            selectRandomWords();
            generateWordSearchGrid();
            displayWordSearchGrid();
            displayWordList();
            updateWordsFound();
        }

        function selectRandomWords() {
            // Embaralhar todas as palavras e pegar 8 aleatórias
            const shuffled = [...allWordsPool].sort(() => Math.random() - 0.5);
            wordsToFind = shuffled.slice(0, 8);
        }

        function generateWordSearchGrid() {
            // Criar grid 12x12 vazio
            wordSearchGrid = Array(12).fill().map(() => Array(12).fill(''));
            
            // Colocar palavras aleatoriamente
            wordsToFind.forEach(word => {
                let placed = false;
                let attempts = 0;
                
                while (!placed && attempts < 100) {
                    const direction = Math.floor(Math.random() * 3); // 0=horizontal, 1=vertical, 2=diagonal
                    const row = Math.floor(Math.random() * 12);
                    const col = Math.floor(Math.random() * 12);
                    
                    if (canPlaceWord(word, row, col, direction)) {
                        placeWord(word, row, col, direction);
                        placed = true;
                    }
                    attempts++;
                }
            });
            
            // Preencher espaços vazios com letras aleatórias
            for (let i = 0; i < 12; i++) {
                for (let j = 0; j < 12; j++) {
                    if (wordSearchGrid[i][j] === '') {
                        wordSearchGrid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    }
                }
            }
        }

        function canPlaceWord(word, row, col, direction) {
            for (let i = 0; i < word.length; i++) {
                let newRow = row;
                let newCol = col;
                
                if (direction === 0) newCol += i; // horizontal
                else if (direction === 1) newRow += i; // vertical
                else { newRow += i; newCol += i; } // diagonal
                
                if (newRow >= 12 || newCol >= 12 || 
                    (wordSearchGrid[newRow][newCol] !== '' && wordSearchGrid[newRow][newCol] !== word[i])) {
                    return false;
                }
            }
            return true;
        }

        function placeWord(word, row, col, direction) {
            for (let i = 0; i < word.length; i++) {
                let newRow = row;
                let newCol = col;
                
                if (direction === 0) newCol += i;
                else if (direction === 1) newRow += i;
                else { newRow += i; newCol += i; }
                
                wordSearchGrid[newRow][newCol] = word[i];
            }
        }

        function displayWordSearchGrid() {
            const grid = document.getElementById('word-search-grid');
            grid.innerHTML = '';
            
            for (let i = 0; i < 12; i++) {
                for (let j = 0; j < 12; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'word-cell';
                    cell.textContent = wordSearchGrid[i][j];
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    
                    // Eventos para seleção de palavras (mouse e touch)
                    cell.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        selectWordCell(i, j);
                    });
                    
                    cell.addEventListener('mouseenter', () => {
                        handleMouseEnter(i, j);
                    });

                     // Eventos touch para mobile
                    cell.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        selectWordCell(i, j);
                    });
                    
                    cell.addEventListener('touchmove', (e) => {
                        e.preventDefault();
                        const touch = e.touches[0];
                        const element = document.elementFromPoint(touch.clientX, touch.clientY);
                        if (element && element.classList.contains('word-cell')) {
                            const row = parseInt(element.dataset.row);
                            const col = parseInt(element.dataset.col);
                            handleMouseEnter(row, col);
                        }
                    });
                    
                    cell.addEventListener('touchend', (e) => {
                        e.preventDefault();
                        handleMouseUp();
                    });

                    grid.appendChild(cell);
                }
            }
            
             // Eventos globais para finalizar seleção (mouse e touch)
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchend', handleMouseUp);
        }

        function displayWordList() {
            const list = document.getElementById('word-list');
            list.innerHTML = '';
            
            wordsToFind.forEach(word => {
                const item = document.createElement('div');
                item.className = `p-2 rounded ${foundWords.includes(word) ? 'bg-green-500/20 text-green-300' : 'bg-gray-700 text-gray-300'}`;
                item.textContent = word;
                list.appendChild(item);
            });
        }

        let isSelecting = false;
        let selectedCells = [];
        let startCell = null;

        function selectWordCell(row, col) {
            if (!isSelecting) {
                // Iniciar seleção
                isSelecting = true;
                startCell = { row, col };
                selectedCells = [{ row, col }];
                highlightSelectedCells();
            }
        }

        function handleMouseEnter(row, col) {
            if (isSelecting && startCell) {
                // Calcular células entre início e posição atual
                selectedCells = getCellsBetween(startCell.row, startCell.col, row, col);
                highlightSelectedCells();
            }
        }

        function handleMouseUp() {
            if (isSelecting && selectedCells.length > 1) {
                checkSelectedWord();
            }
            
            // Resetar seleção
            isSelecting = false;
            startCell = null;
            clearHighlight();
        }

        function getCellsBetween(startRow, startCol, endRow, endCol) {
            const cells = [];
            const deltaRow = endRow - startRow;
            const deltaCol = endCol - startCol;
            
            // Determinar direção (horizontal, vertical ou diagonal)
            let stepRow = 0, stepCol = 0;
            
            if (deltaRow !== 0) stepRow = deltaRow > 0 ? 1 : -1;
            if (deltaCol !== 0) stepCol = deltaCol > 0 ? 1 : -1;
            
            // Verificar se é uma linha reta válida
            if (deltaRow !== 0 && deltaCol !== 0 && Math.abs(deltaRow) !== Math.abs(deltaCol)) {
                return [{ row: startRow, col: startCol }]; // Retorna apenas célula inicial se não for linha reta
            }
            
            const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
            
            for (let i = 0; i <= steps; i++) {
                cells.push({
                    row: startRow + (stepRow * i),
                    col: startCol + (stepCol * i)
                });
            }
            
            return cells;
        }

        function highlightSelectedCells() {
            // Remover highlight anterior
            clearHighlight();
            
            // Adicionar highlight às células selecionadas
            selectedCells.forEach(cell => {
                const cellElement = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
                if (cellElement) {
                    cellElement.classList.add('selecting');
                }
            });
        }

        function clearHighlight() {
            document.querySelectorAll('.word-cell').forEach(cell => {
                cell.classList.remove('selecting');
            });
        }

        function checkSelectedWord() {
            // Formar palavra das células selecionadas
            const selectedWord = selectedCells.map(cell => 
                wordSearchGrid[cell.row][cell.col]
            ).join('');
            
            const reversedWord = selectedWord.split('').reverse().join('');
            
            // Verificar se a palavra selecionada está na lista
            wordsToFind.forEach(word => {
                if (!foundWords.includes(word) && (word === selectedWord || word === reversedWord)) {
                    foundWords.push(word);
                    
                    // Marcar células como encontradas permanentemente
                    selectedCells.forEach(cell => {
                        const cellElement = document.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
                        if (cellElement) {
                            cellElement.classList.add('found');
                        }
                    });
                    
                    displayWordList();
                    updateWordsFound();
                    
                    if (foundWords.length === wordsToFind.length) {
                        setTimeout(() => showWordSearchResults(), 500);
                    }
                }
            });
        }

        function updateWordsFound() {
            document.getElementById('words-found').textContent = foundWords.length;
        }

        function showWordSearchResults() {
            const totalWords = wordsToFind.length;
            const foundCount = foundWords.length;
            const percentage = (foundCount / totalWords) * 100;
            
            let performance, message, emoji;
            
            if (percentage === 100) {
                performance = "PERFEITO";
                message = "Incrível! Você tem uma visão aguçada para encontrar palavras!";
                emoji = "🏆";
            } else if (percentage >= 75) {
                performance = "EXCELENTE";
                message = "Muito bem! Sua capacidade de observação é impressionante!";
                emoji = "🌟";
            } else if (percentage >= 50) {
                performance = "BOM";
                message = "Bom trabalho! Continue praticando sua observação!";
                emoji = "👍";
            } else {
                performance = "PODE MELHORAR";
                message = "Continue tentando! A prática melhora a observação!";
                emoji = "🔍";
            }
            
            alert(`${emoji} PARABÉNS! CAÇA-PALAVRAS CONCLUÍDO!\n\n` +
                  `🎯 Performance: ${performance}\n` +
                  `🔤 Palavras encontradas: ${foundCount}/${totalWords}\n` +
                  `📊 Percentual: ${percentage.toFixed(1)}%\n` +
                  `👁️ Nível de observação: ${getObservationLevel(percentage)}\n\n` +
                  `💭 ${message}`);
        }

        function getObservationLevel(percentage) {
            if (percentage === 100) return "Detetive";
            if (percentage >= 75) return "Observador";
            if (percentage >= 50) return "Atento";
            return "Distraído";
        }



        // Adivinhe o ODS - Todos os 17 ODS
        const allGuessData = [
            {
                ods: "ODS 1 <br> Erradicação da Pobreza",
                clues: ["Acabar com a pobreza extrema", "Garantir direitos básicos", "Renda mínima para todos", "Primeiro objetivo da agenda 2030"],                
            },
            {
                ods: "ODS 2 <br> Fome Zero",
                clues: ["Acabar com a fome", "Segurança alimentar", "Agricultura sustentável", "Nutrição adequada para todos"],                
            },
            {
                ods: "ODS 3 <br> Saúde e Bem-Estar",
                clues: ["Vida saudável para todos", "Reduzir mortalidade infantil", "Combater doenças", "Acesso a medicamentos"],                
            },
            {
                ods: "ODS 4 <br> Educação de Qualidade",
                clues: ["Educação inclusiva e equitativa", "Aprendizagem ao longo da vida", "Alfabetização universal", "Acesso ao ensino superior"],                
            },
            {
                ods: "ODS 5 <br> Igualdade de Gênero",
                clues: ["Empoderamento das mulheres", "Fim da discriminação", "Igualdade de oportunidades", "Combate à violência de gênero"],                
            },
            {
                ods: "ODS 6 <br> Água Potável",
                clues: ["Recurso essencial para a vida", "Saneamento básico", "Gestão sustentável da água", "Acesso universal à água limpa"],                
            },
            {
                ods: "ODS 7 <br> Energia Limpa",
                clues: ["Energia renovável", "Acesso universal à energia", "Eficiência energética", "Solar, eólica e outras fontes limpas"],                
            },
            {
                ods: "ODS 8 <br> Trabalho Decente",
                clues: ["Crescimento econômico sustentável", "Emprego pleno e produtivo", "Trabalho digno para todos", "Fim do trabalho infantil"],                
            },
            {
                ods: "ODS 9 <br> Indústria e Inovação",
                clues: ["Infraestrutura resiliente", "Industrialização sustentável", "Fomentar a inovação", "Tecnologia para o desenvolvimento"],                
            },
            {
                ods: "ODS 10 <br> Redução das Desigualdades",
                clues: ["Reduzir desigualdades", "Inclusão social e econômica", "Igualdade de oportunidades", "Políticas fiscais progressivas"],                
            },
            {
                ods: "ODS 11 <br> Cidades Sustentáveis",
                clues: ["Cidades inclusivas e seguras", "Urbanização sustentável", "Transporte público eficiente", "Redução do impacto ambiental urbano"],                
            },
            {
                ods: "ODS 12 <br> Consumo Responsável",
                clues: ["Produção e consumo sustentáveis", "Uso eficiente de recursos", "Redução do desperdício", "Economia circular"],                
            },
            {
                ods: "ODS 13 <br> Ação Climática",
                clues: ["Combate às mudanças climáticas", "Redução de emissões", "Adaptação climática", "Acordo de Paris"],                
            },
            {
                ods: "ODS 14 <br> Vida na Água",
                clues: ["Conservação dos oceanos", "Uso sustentável dos recursos marinhos", "Redução da poluição marinha", "Proteção dos ecossistemas aquáticos"],                
            },
            {
                ods: "ODS 15 <br> Vida Terrestre",
                clues: ["Proteção dos ecossistemas terrestres", "Combate à desertificação", "Conservação da biodiversidade", "Gestão sustentável das florestas"],                
            },
            {
                ods: "ODS 16 <br> Paz e Justiça",
                clues: ["Sociedades pacíficas e inclusivas", "Acesso à justiça", "Instituições eficazes", "Redução da violência"],               
            },
            {
                ods: "ODS 17 <br> Parcerias",
                clues: ["Parcerias globais", "Cooperação internacional", "Financiamento para o desenvolvimento", "Transferência de tecnologia"],                
            }
        ];

        let currentGuessRound = 0;
        let guessGameScore = 0;
        let currentGameQuestions = [];

        function startGuessGame() {
            currentGuessRound = 0;
            guessGameScore = 0;
            
            // Embaralhar todos os ODS e selecionar 10 para esta rodada
            const shuffledODS = [...allGuessData].sort(() => Math.random() - 0.5);
            currentGameQuestions = shuffledODS.slice(0, 10);
            
            updateGuessDisplay();
            showNextGuessRound();
        }

        function showNextGuessRound() {
            if (currentGuessRound >= currentGameQuestions.length) {
                showGuessGameResults();
                return;
            }

            const current = currentGameQuestions[currentGuessRound];
            const cluesContainer = document.getElementById('guess-clues');
            cluesContainer.innerHTML = '';
            
            current.clues.forEach((clue, index) => {
                const clueDiv = document.createElement('div');
                clueDiv.className = 'p-2 bg-blue-500/20 rounded text-blue-300';
                clueDiv.textContent = `${index + 1}. ${clue}`;
                cluesContainer.appendChild(clueDiv);
            });

            
       
            // Criar opções (incluindo a correta + 2 incorretas aleatórias)
            const incorrectOptions = allGuessData.filter(g => g !== current); 
            const shuffledIncorrect = incorrectOptions.sort(() => Math.random() - 0.5);            
            const options = [current, ...shuffledIncorrect.slice(0, 2)];
            options.sort(() => Math.random() - 0.5); 

            const optionsContainer = document.getElementById('guess-options');
            optionsContainer.innerHTML = '';
            
            options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'cyber-card p-4 rounded-lg text-center hover:bg-green-500/20 transition-all';
                button.innerHTML = `</div><div class="text-sm">${option.ods}</div>`;
                button.onclick = () => guessAnswer(option === current);
                optionsContainer.appendChild(button);
            });
        }

        function guessAnswer(isCorrect) {
            if (isCorrect) {
                guessGameScore++;               
            }
            
            currentGuessRound++;
            updateGuessDisplay();
            setTimeout(showNextGuessRound, 1000);
        }

        function updateGuessDisplay() {
            document.getElementById('guess-round').textContent = Math.min(currentGuessRound + 1, currentGameQuestions.length);
            document.getElementById('guess-score').textContent = guessGameScore;
        }

        function showGuessGameResults() {
            const totalQuestions = currentGameQuestions.length;
            const correctAnswers = guessGameScore;
            const percentage = (correctAnswers / totalQuestions) * 100;
            
            let performance, message, emoji;
            
            if (percentage >= 90) {
                performance = "ESPECIALISTA EM ODS";
                message = "Fantástico! Você conhece muito bem os Objetivos de Desenvolvimento Sustentável!";
                emoji = "🏆";
            } else if (percentage >= 70) {
                performance = "MUITO BOM";
                message = "Excelente! Você tem um bom conhecimento sobre os ODS!";
                emoji = "🌟";
            } else if (percentage >= 50) {
                performance = "BOM";
                message = "Bom trabalho! Continue aprendendo sobre os ODS!";
                emoji = "👍";
            } else {
                performance = "PRECISA ESTUDAR MAIS";
                message = "Continue estudando os ODS! Cada um é importante para o futuro!";
                emoji = "📚";
            }
            
            alert(`${emoji} PARABÉNS! ADIVINHE O ODS CONCLUÍDO!\n\n` +
                  `🎯 Performance: ${performance}\n` +
                  `✅ Acertos: ${correctAnswers}/${totalQuestions}\n` +
                  `📊 Percentual: ${percentage.toFixed(1)}%\n` +
                  `🎓 Nível ODS: ${getODSLevel(percentage)}\n\n` +
                  `💭 ${message}`);
        }

        function getODSLevel(percentage) {
            if (percentage >= 90) return "Especialista";
            if (percentage >= 70) return "Conhecedor";
            if (percentage >= 50) return "Aprendiz";
            return "Iniciante";
        }

        // Mito ou Verdade - 15 perguntas para variar
        const allMythStatements = [
            {
                statement: "Reciclar uma lata de alumínio economiza energia suficiente para manter uma TV ligada por 3 horas.",
                isTrue: true,
                explanation: "VERDADE! O alumínio reciclado usa 95% menos energia que produzir alumínio novo."
            },
            {
                statement: "Os oceanos absorvem cerca de 30% do CO2 produzido pelos humanos.",
                isTrue: true,
                explanation: "VERDADE! Os oceanos são grandes absorvedores de CO2, mas isso causa acidificação."
            },
            {
                statement: "Plantar árvores resolve completamente o problema das mudanças climáticas.",
                isTrue: false,
                explanation: "MITO! Plantar árvores ajuda, mas precisamos também reduzir emissões e mudar hábitos."
            },
            {
                statement: "A energia solar só funciona quando há sol direto.",
                isTrue: false,
                explanation: "MITO! Painéis solares funcionam mesmo em dias nublados, só com menor eficiência."
            },
            {
                statement: "Cada pessoa produz em média 1kg de lixo por dia.",
                isTrue: true,
                explanation: "VERDADE! No Brasil, cada pessoa produz cerca de 1kg de resíduos sólidos diariamente."
            },
            {
                statement: "Usar sacolas de papel é sempre melhor para o meio ambiente que sacolas plásticas.",
                isTrue: false,
                explanation: "MITO! Sacolas de papel podem gerar mais poluição na produção e usar mais água e energia."
            },
            {
                statement: "A Amazônia produz 20% do oxigênio do mundo.",
                isTrue: true,
                explanation: "VERDADE! A Floresta Amazônica é conhecida como 'pulmão do mundo' por sua produção de oxigênio."
            },
            {
                statement: "Carros elétricos não produzem nenhuma emissão de carbono.",
                isTrue: false,
                explanation: "MITO! Dependem da fonte de energia elétrica. Se vier de carvão, ainda há emissões indiretas."
            },
            {
                statement: "Uma única árvore pode absorver até 22kg de CO2 por ano.",
                isTrue: true,
                explanation: "VERDADE! Uma árvore madura pode absorver entre 20-25kg de CO2 anualmente."
            },
            {
                statement: "Produtos orgânicos sempre têm menor pegada de carbono.",
                isTrue: false,
                explanation: "MITO! Alguns produtos orgânicos podem ter maior pegada devido ao transporte ou métodos de produção."
            },
            {
                statement: "O gado é responsável por mais emissões de gases do efeito estufa que todos os carros do mundo.",
                isTrue: true,
                explanation: "VERDADE! A pecuária produz cerca de 14,5% das emissões globais, mais que o transporte rodoviário."
            },
            {
                statement: "Lâmpadas LED duram 25 vezes mais que lâmpadas incandescentes.",
                isTrue: true,
                explanation: "VERDADE! LEDs podem durar até 25.000 horas, enquanto incandescentes duram cerca de 1.000 horas."
            },
            {
                statement: "Reciclar plástico pode ser feito infinitas vezes sem perder qualidade.",
                isTrue: false,
                explanation: "MITO! O plástico perde qualidade a cada reciclagem e só pode ser reciclado algumas vezes."
            },
            {
                statement: "Banhos de 5 minutos gastam menos água que um banho de banheira.",
                isTrue: true,
                explanation: "VERDADE! Um banho rápido gasta cerca de 45L, enquanto uma banheira pode usar 200L ou mais."
            },
            {
                statement: "O aquecimento global faz com que todos os lugares do mundo fiquem mais quentes.",
                isTrue: false,
                explanation: "MITO! Algumas regiões podem ficar mais frias devido às mudanças nas correntes oceânicas e atmosféricas."
            }
        ];

        let currentMythStatements = [];

        let currentMythQuestion = 0;
        let mythScore = 0;

        function startMythGame() {
            currentMythQuestion = 0;
            mythScore = 0;
            
            // Embaralhar todas as perguntas e selecionar 10 para esta rodada
            const shuffledStatements = [...allMythStatements].sort(() => Math.random() - 0.5);
            currentMythStatements = shuffledStatements.slice(0, 10);
            
            updateMythDisplay();
            showNextMythStatement();
        }

        function showNextMythStatement() {
            if (currentMythQuestion >= currentMythStatements.length) {
                showMythGameResults();
                return;
            }

            const statement = currentMythStatements[currentMythQuestion];
            document.getElementById('myth-statement').textContent = statement.statement;
            document.getElementById('myth-explanation').classList.add('hidden');
        }

        function answerMyth(userAnswer) {
            const statement = currentMythStatements[currentMythQuestion];
            const isCorrect = userAnswer === statement.isTrue;
            
            if (isCorrect) {
                mythScore++;
            }

            // Mostrar explicação
            const explanationDiv = document.getElementById('myth-explanation');
            explanationDiv.innerHTML = `
                <div class="text-center">
                    <div class="text-2xl mb-2">${isCorrect ? '✅' : '❌'}</div>
                    <p class="text-white font-semibold">${statement.explanation}</p>
                </div>
            `;
            explanationDiv.classList.remove('hidden');

            currentMythQuestion++;
            updateMythDisplay();
            
            setTimeout(() => {
                showNextMythStatement();
            }, 3000);
        }

        function updateMythDisplay() {
            document.getElementById('myth-current').textContent = Math.min(currentMythQuestion + 1, currentMythStatements.length);
            document.getElementById('myth-score').textContent = mythScore;
        }

        function showMythGameResults() {
            const totalQuestions = currentMythStatements.length;
            const correctAnswers = mythScore;
            const percentage = (correctAnswers / totalQuestions) * 100;
            
            let performance, message, emoji;
            
            if (percentage === 100) {
                performance = "DETETIVE DA SUSTENTABILIDADE";
                message = "Perfeito! Você sabe distinguir muito bem fatos de mitos ambientais!";
                emoji = "🏆";
            } else if (percentage >= 80) {
                performance = "ANALISTA EXPERIENTE";
                message = "Excelente! Você tem ótima capacidade de análise crítica!";
                emoji = "🌟";
            } else if (percentage >= 60) {
                performance = "BOM OBSERVADOR";
                message = "Bom trabalho! Continue desenvolvendo seu senso crítico!";
                emoji = "👍";
            } else {
                performance = "PRECISA TREINAR MAIS";
                message = "Continue praticando! O pensamento crítico é fundamental!";
                emoji = "🧠";
            }
            
            alert(`${emoji} PARABÉNS! MITO OU VERDADE CONCLUÍDO!\n\n` +
                  `🎯 Performance: ${performance}\n` +
                  `✅ Acertos: ${correctAnswers}/${totalQuestions}\n` +
                  `📊 Percentual: ${percentage.toFixed(1)}%\n` +
                  `🔍 Nível de análise: ${getAnalysisLevel(percentage)}\n\n` +
                  `💭 ${message}`);
        }

        function getAnalysisLevel(percentage) {
            if (percentage === 100) return "Detetive";
            if (percentage >= 80) return "Analista";
            if (percentage >= 60) return "Observador";
            return "Aprendiz";
        }

        // Inicializar página
        document.addEventListener('DOMContentLoaded', function() {
            initMatrixEffect();
            showGameMenu();
        });

        (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9791c4c8a681f202',t:'MTc1Njg2NjAzNC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();