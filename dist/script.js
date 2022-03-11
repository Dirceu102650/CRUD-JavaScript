const carrinho = [
  {
    prod: [
      { id: 1, produto: "Ducha", preco: 8.9, status: true },
      { id: 2, produto: "Extensor", preco: 145.9, status: false },
      { id: 3, produto: "Chaveiro", preco: 15.9, status: false },
      { id: 4, produto: "Cabo de cobre", preco: 145.9, status: false }
    ],
    produto2: [
      { produto: "Martelo", preco: 3.9, status: true },
      { produto: "Alecate", preco: 185.9, status: false }
    ]
  }
];

carrinho.forEach(function (n, indice) {
  n.prod.forEach(function (p) {
    const str = `<tr id="linha${p.id}">
    <td><input id="inputs1${p.id}" style="display:none;" value="${p.produto}"></input><b id="produto${p.id}">${p.produto}</b></td>
    <td><input id="inputs2${p.id}" style="display:none;" value="${p.preco}"></input><b id="preco${p.id}">${p.preco}</b></td>
    <td><input id="inputs3${p.id}" style="display:none;" value="${p.status}"></input><b id="status${p.id}">${p.status}</b></td>
    <td width="25%"><button onClick="editar(${p.id})">Editar</button><button onClick="clickButton(${p.id})">Confirmar</button><button onClick="excluir(${p.id})">Excluir</button></td>
    </tr>`;
    $("#preco" + p.id).val($("#inputs1" + p.d).val());
    document.getElementById("produtos").insertAdjacentHTML("afterend", str);
  });
});

function clickButton(id) {
  $("#inputs1" + id).css("display", "none");
  $("#inputs2" + id).css("display", "none");
  $("#inputs3" + id).css("display", "none");
  $("#produto" + id).show();
  $("#produto" + id).text($("#inputs1" + id).val());
  $("#preco" + id).show();
  $("#preco" + id).text($("#inputs2" + id).val());
  $("#status" + id).show();
  $("#status" + id).text($("#inputs3" + id).val());
}
function editar(id) {
  $("#inputs1" + id).css("display", "block");
  $("#inputs2" + id).css("display", "block");
  $("#inputs3" + id).css("display", "block");
  $("#produto" + id).hide();
  $("#preco" + id).hide();
  $("#status" + id).hide();
}

function excluir(id) {
  const linha = $("#linha" + id);
  linha.hide();
}

function filtrarConteudoTabela(filtro, idTable) {
  var cont = 0;

  var Filtro = {
    show: function (e) {
      $(e).show();
      cont++;
    },

    hide: function (e) {
      $(e).hide();
    },

    addColor: function (e) {
      $(e).css("background-color", "#FFDEAD");
    },

    removeColor: function (e) {
      $(e).css("background-color", "transparent");
    }
  };

  filtro = filtro || "";
  filtro = filtro.toLowerCase();
  $("#" + idTable)
    .find("tbody > tr")
    .each(function () {
      var blnLinha = false;

      // Percorre as colunas
      $(this)
        .find("td")
        .each(function () {
          var valor = $(this).text().toLowerCase();

          if ($(this).find("span").length > 0) {
            if ($(this).find("span").attr("title")) {
              valor = $(this).find("span").attr("title").toLowerCase();
            }
          }

          if (valor.indexOf(filtro) != -1) {
            if (filtro.length != 0) {
              Filtro.addColor($(this));
            } else {
              Filtro.removeColor($(this));
            }

            blnLinha = true;
          } else {
            Filtro.removeColor($(this));
          }
        });

      if (blnLinha) {
        Filtro.show($(this));
      } else {
        Filtro.hide($(this));
      }
    });

  var colspan = $("#" + idTable).find("thead > tr > th").length;
  var str =
    cont == 0
      ? '<tr><th colspan="' + colspan + '">Nenhum registro encontrado</th></tr>'
      : "";
  $("#" + idTable)
    .find("tfoot")
    .html(str);
}