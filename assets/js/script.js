$(() => {
  // Índice que marca com estapa esta
  let secaoIndice = 0;

  // Elemento com contador de seção atual
  const $elmMarcaDeSecoes = $(".info-list-item");

  // Referência das seções
  const $secoes = [
    $(".person-info"),
    $(".select-plan"),
    $(".addons"),
    $(".confirm-section"),
    $(".thanks-section")
  ];

  // Elementos da ETAPA 1. Campos de entrada
  const $campoDoNome = $("input[id='name']");
  const nomePadrao = /^[a-zA-Z\s\p{L}]+$/u;

  const $campoDoEmail = $("input[id='email']");
  const emailPadrao = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|coop|[a-zA-Z]{2,})$/;

  const $campoDoTel = $("input[id='phone']");
  const telefonePadrao =
  /^[+]?[0-9]{1,2}\s?\(?[1-9]{1,3}\)?\s?[2-9][0-9]{2,3}\-?\s?[0-9]{3,4}$/;
  // Padrão campo telefone vazio
  $campoDoTel.val("");

  const $elmMsgInfoErro = $(".person-info-form__error");

  // ETAPA 2 recepientes de seleção de plano
  const $planos = $(".plan-option-item");
  const $mesAnoSwitch = $(".switch__input");
  const $textoInfoMesNoSwitch = $(".plan-option-date__month");
  const $textoInfoAnoNoSwitch = $(".plan-option-date__year");
  const $precoDosPlanos = $(".plan-option-caption__price");

  // ETAPA 3 items adicionais
  const $addonsItems = $(".addons-option-item");
  const $precoAdicionais = $(".addons-option-price__text");

  // ETAPA 4 confirmação de planos escolhidos
  const $tituloDoPlano = $(".confirm-plan__title");
  const $precoPlanoConfirma = $(".confirm-price__value");
  const $titleInfoTotal = $(".confirm-total__title");
  const $precoTotal = $(".confirm-total__price");

  // Botões de próximo, anterior e recipiente dos botões
  const $elmRecipienteBtn = $(".btn-group");
  const $btnProximo = $(".btn-group__next");
  const $btnAnterior = $(".btn-group__back");

  // Soma total recipiente
  let somaTotal = 9;
  let addons = 0;

  // Esconder linha horizontal na confirmação
  $(".vr-addon").hide();

  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* --------------------------------- ETAPA 01 --------------------------------- */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */

  // Função de validação do campo de nome
  function validacaoDoCampoNome() {
    // Armazena o valor do campo de nome
    const valorDoNome = $campoDoNome.val();

    // Se ele NÃO condizer com o padrão da RegExp
    if (!nomePadrao.test(valorDoNome)) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(0).css("visibility", "visible");

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(0).text("Enter the name field correctly.");

      // Adiciona uma borda vermelha ao campo de nome e
      // seu foco também será da cor vermelha
      $campoDoNome.addClass("person-info-form__field--error");
    } else {
      // Torna mensagem de erro oculta
      $elmMsgInfoErro.eq(0).css("visibility", "hidden");

      // Remove borda e foco vermelho do campo nome
      $campoDoNome.removeClass("person-info-form__field--error");
    }

    if (valorDoNome.search(/\d/g) > -1) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(0).css("visibility", "visible");

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(0).text("Do not enter numbers in this field.");
    }

    // Se o campo do nome for vazio
    if (!valorDoNome) {
      // Torna mensagem de erro oculta
      $elmMsgInfoErro.eq(0).css("visibility", "hidden");

      // Remove borda e foco vermelho do campo nome
      $campoDoNome.removeClass("person-info-form__field--error");
    }
  }

  // Função de validação do campo de e-mail
  function validacaoDoCampoEmail() {
    // Armazena o valor do campo de e-mail
    const valorDoEmail = $campoDoEmail.val();

    // Se ele NÃO condizer com o padrão da RegExp
    if (valorDoEmail && !emailPadrao.test(valorDoEmail)) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(1).css("visibility", "visible");

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(1).text("Enter your email correctly.");

      // Adiciona uma borda vermelha ao campo de nome e
      // seu foco também será da cor vermelha
      $campoDoEmail.addClass("person-info-form__field--error");
    } else {
      // Torna mensagem de erro oculta
      $elmMsgInfoErro.eq(1).css("visibility", "hidden");

      // Remove borda e foco vermelho do campo nome
      $campoDoEmail.removeClass("person-info-form__field--error");
    }

    // Se o campo do e-mail for vazio
    if (!valorDoEmail) {
      // Torna mensagem de erro oculta
      $elmMsgInfoErro.eq(1).css("visibility", "hidden");

      // Remove borda e foco vermelho do campo nome
      $campoDoEmail.removeClass("person-info-form__field--error");
    }
  }

  function validacaoDigitacaoDoCampoEmail() {
    if (!emailPadrao.test($campoDoEmail.val())) {
      $campoDoEmail.addClass("person-info-form__field--error");

      if(!$campoDoEmail.val()) {
        $campoDoEmail.removeClass("person-info-form__field--error");
        $elmMsgInfoErro.eq(1).css("visibility", "hidden");
      }
    } else {
      $elmMsgInfoErro.eq(1).css("visibility", "hidden");
      $campoDoEmail.removeClass("person-info-form__field--error");
    }
  }

  // Função de validação do campo de telefone
  function validacaoDoCampoTelefone() {
    // Armazena o valor do campo de telefone
    const telValue = $campoDoTel.val();

    // Se ele NÃO condizer com o padrão da RegExp
    if (!telefonePadrao.test(telValue)) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(2).css("visibility", "visible");

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(2).text("Enter a valid number");

      // Adiciona uma borda vermelha ao campo de nome e
      // seu foco também será da cor vermelha
      $campoDoTel.addClass("person-info-form__field--error");

      // Se o valor do campo de telefone for igual um sínal de soma
      // ou se o valor for um campo vazio
      if (telValue === "+" || !telValue) {
        // Torna mensagem de erro oculta
        $elmMsgInfoErro.eq(2).css("visibility", "hidden");
        // Adiciona um sinal de soma para inserir código de área
        $campoDoTel.val("+");
      }
    } else {
      // Torna mensagem de erro oculta
      $elmMsgInfoErro.eq(2).css("visibility", "hidden");

      // Remove borda e foco vermelho do campo nome
      $campoDoTel.removeClass("person-info-form__field--error");
    }
  }

  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* ---------------------------- ETAPA 02 PLANOS ------------------------------- */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */

  // Primeiro plano "Arcade" selecionado por padrão.
  $planos.eq(0).addClass("plan-option-item--selected");

  // Função para adicionar efeito em seleção de planos
  function selecaoDePlanos() {
    // Loop planos
    $planos.each((i,elm) => {
      // Limpar todos os planos e seus efeitos de seleção
      $(elm).removeClass("plan-option-item--selected");
    });

    // Alterar a seleção em elementos que não tenham a classe
    $(this).toggleClass("plan-option-item--selected");

    // Se o plano escolhido for "Arcade"
    if ($(this).find(".plan-option-caption__title").text().search(/Arcade/g) > -1) {
      // Atualiza o texto para "Arcade" na etapa de confirmação
      $tituloDoPlano.text("Arcade");

      // Atualiza o valor do plano na etapa de confirmação
      $precoPlanoConfirma.text("$9/mo");
      $(".confirm-price__value").text($(this).find(".plan-option-caption__price").text());
    }

    // Se o plano escolhido for "Advanced"
    if ($(this).find(".plan-option-caption__title").text().search(/Advanced/g) > -1) {
      // Atualiza o texto para "Arcade" na etapa de confirmação
      $tituloDoPlano.text(`Advanced`);

      // Atualiza o valor do plano na etapa de confirmação
      $precoPlanoConfirma.text("$12/mo");
      $(".confirm-price__value").text($(this).find(".plan-option-caption__price").text());
    }

    // Se o plano escolhido for "Pro"
    if ($(this).find(".plan-option-caption__title").text().search(/Pro/g) > -1) {
      // Atualiza o texto para "Arcade" na etapa de confirmação
      $tituloDoPlano.text(`Pro`);

      // Atualiza o valor do plano na etapa de confirmação
      $precoPlanoConfirma.text("$15/mo");
      $(".confirm-price__value").text($(this).find(".plan-option-caption__price").text());
    }
  }

  // Switch para alternar entre mês ou ano
  function alternarMesEAno() {
    $mesAnoSwitch.prop("checked");
    $(".month-free-msg").slideDown("fast");
    // Se for checado o campo será anual
    if ($mesAnoSwitch.prop("checked")) {
      // Ativa switch
      $(this).attr("checked", true);

      // Altera textos para o plano anual
      $precoDosPlanos.each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("/mo", "0/yr");
        });
      })

      // Altrar preco dos addons como anual
      $precoAdicionais.each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("/mo", "0/yr");
        })
      })

      $(".confirm-addon__price").each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("/mo", "0/yr");
        })
      })

      // Valor do plano na etapa de confirmação
      $precoPlanoConfirma.each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("/mo", "0/yr");
        });
      })

      // Destaca o texto de "yearly" no switch
      $textoInfoAnoNoSwitch.addClass("plan-option-date__active");

      // Remove destaque do mes no switch
      $textoInfoMesNoSwitch.removeClass("plan-option-date__active");
    } else {
      $(this).attr("checked", false);
      $(".month-free-msg").slideUp("fast");

      // Altera textos para o plano mensal
      $precoDosPlanos.each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("0/yr", "/mo");
        });
      })

      // Altrar preco dos addons como mensal
      $precoAdicionais.each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("0/yr", "/mo");
        })
      })

      $(".confirm-addon__price").each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("0/yr", "/mo");
        })
      })

      // Valor do plano na etapa de confirmação
      $precoPlanoConfirma.each((i,elm) => {
        $(elm).text((i,oldContent) => {
          return oldContent.replace("0/yr", "/mo");
        });
      })

      // Destaca o texto de "monthly" no switch
      $textoInfoMesNoSwitch.addClass("plan-option-date__active");

      // Remvoe destaque do ano no switch
      $textoInfoAnoNoSwitch.removeClass("plan-option-date__active");
    }
  }

  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* ---------------------------- ETAPA 03 ADDONS ------------------------------- */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */

  // Função executa ação ao adicionar addons
  function selecionarAdicionais() {
    // Alternar caixas de seleção
    $(this).find("#onlineService").prop("checked", !$(this).find("#onlineService").prop("checked"));
    $(this).find("#large-storage").prop("checked", !$(this).find("#large-storage").prop("checked"));
    $(this).find("#customizable-profile").prop("checked", !$(this).find("#customizable-profile").prop("checked"));

    // Alterar entre selecionado ou não
    $(this).toggleClass("addons-option-item--selected");

    // Se um item adicional for selecionado
    if ($(this).find(".addons-check__checkbox").is(":checked")) {
      // Adiciona efeito de destacar o addon atual marcado
      $(this).addClass("addons-option-item--selected");

      // Verifica se o addon marcado foi o "Online service".
      if ($(this).find(".addons-option-info__title").text().search("Online service") > -1) {
        // Caso seja, acrecenta um novo elemento filho a .confirm-container
        $(".confirm-container").append(`
          <div class="confirm-addon-item" id="onServ">
            <h5 class="confirm-addon-item__title">Online service</h5>
            <p class="confirm-addon__price">${$precoAdicionais.eq(0).text()}</p>
          </div>
        `);
      }

      // Verifica se o addon marcado foi o "Larger storage".
      if ($(this).find(".addons-option-info__title").text().search("Larger storage") > -1) {
        // Caso seja, acrecenta um novo elemento filho a .confirm-container.
        $(".confirm-container").append(`
          <div class="confirm-addon-item" id="largeStorage">
            <h5 class="confirm-addon-item__title">Larger storage</h5>
            <p class="confirm-addon__price">${$precoAdicionais.eq(1).text()}</p>
          </div>
        `);
      }

      // Verifica se o addon marcado foi o "Customizable Profile".
      if ($(this).find(".addons-option-info__title").text().search("Customizable Profile") > -1) {
        // Caso seja, acrecenta um novo elemento filho a .confirm-container.
        $(".confirm-container").append(`
          <div class="confirm-addon-item" id="customProf">
            <h5 class="confirm-addon-item__title">Customizable Profile</h5>
            <p class="confirm-addon__price">${$precoAdicionais.eq(2).text()}</p>
          </div>
        `);
      }

    // Se caso o item adicional seja desmarcado
    } else {
      // Remove efeito de destacar o addon atual marcado
      $(this).removeClass("addons-option-item--selected");

      // Verifica se o item desmarcado foi "Online Service"
      if ($(this).find(".addons-option-info__title").text().search("Online service") > -1) {
        // Se sim, remove o item adicional da confirmação do plano
        $(".confirm-addon-item").remove("#onServ");
      }

      // Verifica se o item desmarcado foi "Larger storage"
      if ($(this).find(".addons-option-info__title").text().search("Larger storage") > -1) {
        // Se sim, remove o item adicional da confirmação do plano
        $(".confirm-addon-item").remove("#largeStorage");
      }

      // Verifica se o item desmarcado foi "Customizable Profile"
      if ($(this).find(".addons-option-info__title").text().search("Customizable Profile") > -1) {
        // Se sim, remove o item adicional da confirmação do plano
        $(".confirm-addon-item").remove("#customProf");
      }
    }

    // Se algum dos items adicionais estiverem marcados
    if ($(".addons-check__checkbox").eq(0).prop("checked") ||
        $(".addons-check__checkbox").eq(1).prop("checked") ||
        $(".addons-check__checkbox").eq(2).prop("checked")) {
      // Exibe uma linha horizontal na parte de confirmação do plano
      $(".vr-addon").show();
    } else {
      // Se não, a remove
      $(".vr-addon").hide();
    }
  }

  /* /// SEÇÕES TRATAMENTO ////////////////////////////////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* //////////////////////////// SEÇÕES TRATAMENTO ///////////////////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  /* ///////////////////////////////////////// SEÇÕES TRATAMENTO //////////////// */
  /* //////////////////////////////////////////////////////////////////////////// */
  // Função mostrar seção atual
  function tratarSecoes(n) {
    let soma = 0;
    // Ocultar seções e remover marcação ativa
    function resetarSecoes() {
      // Loop oculta todas as seções
      for (let i = 0; i < $secoes.length; i++) {
        $secoes[i].hide();
      }

      // Loop remove marcação de seção atual
      $elmMarcaDeSecoes.each(() => {
        $elmMarcaDeSecoes.removeClass("active");
      });
    }

    // Enquanto o índice for menor que
    // a quantidade das seções do site
    if (n < $secoes.length) {
      // Reseta todas as seções e marcações de seção atual
      resetarSecoes();

      // Se o "n", no caso, o número do índice de seções for diferente de zero(0)
      if (n) {
        // Exibir botão de voltar seção
        $btnAnterior.removeClass("btn-group-none");
      } else {
        // Se não, ocultá-lo
        $btnAnterior.addClass("btn-group-none");
      }

      // Enquanto o número do índice de seções for menor que 4
      if (n < 4) {
        // Marca a seção atual ativa
        $elmMarcaDeSecoes.eq(n).addClass("active");
      } else {
        // Se for maior ou igual a 4 sempre marca ativa será a seção índice 3
        $elmMarcaDeSecoes.eq(3).addClass("active");
      }

      // Se o índice de seções estiver na terceira etapa
      if (n === 3) {
        // Modifica o botão com a nova classe
        $btnProximo.addClass("btn-group__next--confirm");

        // Muda seu texto
        $btnProximo.text("Confirm");

        soma += Number($precoPlanoConfirma.text().match(/[0-9]+/g).join(""));

        $precoTotal.text((i, oldContent) => {
          $(".confirm-addon__price").each((i,elm) => {
            soma += Number($(elm).text().match(/[0-9]+/g).join(""));
          })
          return oldContent.replace(/[0-9]+/g, soma);
        })

        console.log($precoPlanoConfirma.text());
      } else {
        // Se não retorna o padrão
        $btnProximo.removeClass("btn-group__next--confirm");
        $btnProximo.text("Next Step");
      }

      // Se o índice de seções estiver na quarta etapa
      if (n === 4) {
        // A seção atual terá uma exibição flexível
        $secoes[secaoIndice].css("display", "flex");

        // Oculta o recipiente com os botões de avanço e retorno
        $elmRecipienteBtn.css("display", "none");
      } else {
        // Se não, re-exibe os botões
        $secoes[secaoIndice].css("display", "block");
      }
    }
  }

  // Executa a função que tratará as seções e seus botões
  tratarSecoes(secaoIndice);

  // Função que avança para próxima seção
  function avancarSecoes() {

    // Verifica os campos da etapa 1
    // para poder pular para próxima seção
    if (nomePadrao.test($campoDoNome.val()) &&
      emailPadrao.test($campoDoEmail.val()) &&
      telefonePadrao.test($campoDoTel.val())) {
        tratarSecoes(secaoIndice = secaoIndice + 1);
    }

    // Se o nome NÃO passou no teste do padrão E se não contiver valor
    if (!nomePadrao.test($campoDoNome.val()) && !$campoDoNome.val()) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(0).css("visibility", "visible");

      // Insere animação de piscar mensagem de erro
      $elmMsgInfoErro.eq(0).addClass("effect_error");
      // Remove a animação de piscar mensagem de erro após 800 millisegundos
      setTimeout(() => {$elmMsgInfoErro.eq(0).removeClass("effect_error")}, 800);

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(0).text("Enter the name field correctly.");

      // Adiciona uma borda vermelha ao campo de nome e
      // seu foco também será da cor vermelha
      $campoDoNome.addClass("person-info-form__field--error");
    }

    // Se o email NÃO passou no teste do padrão E se não contiver valor
    if (!emailPadrao.test($campoDoEmail.val()) || !$campoDoEmail.val()) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(1).css("visibility", "visible");

      // Insere animação de piscar mensagem de erro
      $elmMsgInfoErro.eq(1).addClass("effect_error");
      // Remove a animação de piscar mensagem de erro após 800 millisegundos
      setTimeout(() => {$elmMsgInfoErro.eq(1).removeClass("effect_error")}, 800);

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(1).text("Enter the email field correctly.");

      // Adiciona uma borda vermelha ao campo de nome e
      // seu foco também será da cor vermelha
      $campoDoEmail.addClass("person-info-form__field--error");
    }

    // Se o telefone NÃO passou no teste do padrão E se não contiver valor
    if (!telefonePadrao.test($campoDoTel.val()) || !$campoDoTel.val()) {
      // Torna a mensagem de erro visível
      $elmMsgInfoErro.eq(2).css("visibility", "visible");

      // Insere animação de piscar mensagem de erro
      $elmMsgInfoErro.eq(2).addClass("effect_error");
      // Remove a animação de piscar mensagem de erro após 800 millisegundos
      setTimeout(() => {$elmMsgInfoErro.eq(2).removeClass("effect_error")}, 800);

      // Atualize o texto informando o respectivo erro
      $elmMsgInfoErro.eq(2).text("Enter the email field correctly.");

      // Adiciona uma borda vermelha ao campo de nome e
      // seu foco também será da cor vermelha
      $campoDoTel.addClass("person-info-form__field--error");
    }
  }

  // Função para voltar para a seção anterior
  function retrocederSecoes() {
    // Decrementa o índice de seções atual
    tratarSecoes(secaoIndice = secaoIndice-1);
  }

  $campoDoNome.on("input", validacaoDoCampoNome);
  $campoDoEmail.on("blur", validacaoDoCampoEmail);
  $campoDoEmail.on("input", validacaoDigitacaoDoCampoEmail);
  $campoDoTel.on("input", validacaoDoCampoTelefone);

  $campoDoTel.on("focus", () => {
    if ($campoDoTel.val() === "") {
      $campoDoTel.val("+");
    }
  });

  $campoDoTel.on("blur", () => {
    if ($campoDoTel.val() === "+") {
      $campoDoTel.val("");
    }
  });

  // Adicionar eventos etapa 2 Planos
  $planos.on("click", selecaoDePlanos);
  $mesAnoSwitch.on("change", alternarMesEAno);

  // Adicionar eventos etapa 3 Addons
  $addonsItems.on("click", selecionarAdicionais);

  // Adiciona os eventos aos botões
  $btnProximo.on("click", avancarSecoes);
  $btnAnterior.on("click", retrocederSecoes);
});
