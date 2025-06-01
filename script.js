document.addEventListener('DOMContentLoaded', function() {

    const birthdayInput = document.getElementById('birthday');
    const checkButton = document.getElementById('check-season');
    const resultSection = document.getElementById('result-section');
    const seasonName = document.getElementById('season-name');
    const seasonDescription = document.getElementById('season-description');
    const backgroundTheme = document.querySelector('.background-theme');
    const allSeasonsContainer = document.getElementById('all-seasons');
    const singleSeasonContainer = document.getElementById('single-season-container');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Definições das estações
    const seasons = {
        primavera: {
            name: 'PRIMAVERA',
            description: 'Você nasceu na Primavera! A estação das flores',
            color: '#e91e63',
            themeClass: 'primavera-theme',
            textClass: 'primavera-text',
            startMonth: 8, // Setembro
            endMonth: 11, // Novembro
            cardId: 'primavera-card'
        },
        verao: {
            name: 'VERÃO',
            description: 'Você nasceu no Verão! A estação do calor, sol, praia e os dias  mais longos',
            color: '#009688',
            themeClass: 'verao-theme',
            textClass: 'verao-text',
            startMonth: 11, // Dezembro
            endMonth: 2, // Fevereiro
            cardId: 'verao-card'
        },
        outono: {
            name: 'OUTONO',
            description: 'Você nasceu no Outono! A estação das folhas que caem, cores quentes e temperaturas amenas',
            color: '#ff5722',
            themeClass: 'outono-theme',
            textClass: 'outono-text',
            startMonth: 2, // Março
            endMonth: 5, // Maio
            cardId: 'outono-card'
        },
        inverno: {
            name: 'INVERNO',
            description: 'Você nasceu no Inverno! A estação do frio',
            color: '#3f51b5',
            themeClass: 'inverno-theme',
            textClass: 'inverno-text',
            startMonth: 5, // Junho
            endMonth: 8, // Agosto
            cardId: 'inverno-card'
        }
    };

    // Função para determinar a estação com base na data
    function getSeason(date) {
        const month = date.getMonth(); // 0-11 (Jan-Dez)
        
        if ((month >= seasons.primavera.startMonth && month < seasons.primavera.endMonth)) {
            return seasons.primavera;
        } else if ((month >= seasons.verao.startMonth || month < seasons.verao.endMonth)) {
            return seasons.verao;
        } else if ((month >= seasons.outono.startMonth && month < seasons.outono.endMonth)) {
            return seasons.outono;
        } else {
            return seasons.inverno;
        }
    }

    // Função para exibir a estação
    function displaySeason(season) {
        // Esconder a visualização de todas as estações
        allSeasonsContainer.style.display = 'none';
        
        // Limpar classes anteriores
        backgroundTheme.className = 'background-theme';
        seasonName.className = '';
        singleSeasonContainer.innerHTML = '';
        
        // Criar e adicionar o card da estação específica
        const seasonCard = document.createElement('div');
        seasonCard.className = 'season-card';
        seasonCard.id = season.cardId;
        
        const seasonLabel = document.createElement('div');
        seasonLabel.className = 'season-label';
        seasonLabel.textContent = season.name;
        
        seasonCard.appendChild(seasonLabel);
        singleSeasonContainer.appendChild(seasonCard);
        
        // Adicionar novas classes
        backgroundTheme.classList.add(season.themeClass);
        seasonName.classList.add(season.textClass);
        
        // Atualizar conteúdo
        seasonName.textContent = season.name;
        seasonDescription.textContent = season.description;
        
        // Mostrar a seção de resultado
        resultSection.classList.add('visible');
        
        // Animar o fundo temático
        setTimeout(() => {
            backgroundTheme.style.opacity = '1';
        }, 500);
        
        // Animar a redução da imagem
        setTimeout(() => {
            singleSeasonContainer.classList.add('active');
        }, 1500);
    }

    // Evento de clique no botão
    checkButton.addEventListener('click', function() {
        const birthdayDate = new Date(birthdayInput.value);
        
        // Verificar se a data é válida
        if (isNaN(birthdayDate.getTime())) {
            alert('Por favor, insira uma data válida.');
            return;
        }
        
        // Determinar a estação
        const season = getSeason(birthdayDate);
        
        // Exibir a estação
        displaySeason(season);
    });
    
    // Definir data máxima como hoje
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    birthdayInput.setAttribute('max', `${year}-${month}-${day}`);
    
    // Alternar tema claro/escuro
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-theme');
    });
});
