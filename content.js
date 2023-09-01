$(document).ready(function(){
	var anuncios = $(".item-info-container");
	anuncios.each(function() {
		var precoHtml = $(this).find(".price-row").eq(0);
		var simboloEuro = precoHtml.find(".txt-big");
		var detalhes = $(this).find(".item-detail-char").eq(0);
		var preco = parseInt($(this).find(".item-price")[0].innerText.replaceAll('.', '').replace('€', ''));
		var abc;
		if($(this).find(".item-detail").length > 1) {
			abc = parseInt($(this).find(".item-detail")[1].innerText.replaceAll('.', '').replace('m² área bruta', ''));
			if(isNaN(abc)) // terreno
				abc = parseInt($(this).find(".item-detail")[0].innerText.replaceAll('.', '').replace('m²', ''));
		}
		else // terreno
			abc = parseInt($(this).find(".item-detail")[0].innerText.replaceAll('.', '').replace('m²', ''));
		
		var precom2 = Math.round(preco/abc);
		var link = $(this).children('a').eq(0).attr('href');
		simboloEuro.html("€ " + precom2.toLocaleString('pt-BR') +' €/m²' );
		detalhes.append('<span class="item-detail dadosextra"></span>');
		var div=$(this).find('.dadosextra');
		div.load(link+' .details-property_features:first-of-type', function(responseTxt, statusTxt, xhr){
			var texto = "";
			var index = div.text().indexOf("Lote de")
			if(index != -1) {
				var index2 = div.text().indexOf("m²", index);
				texto += " "
				texto += div.text().substring(index, index2+2);
				texto += "  ";
			}
			index = div.text().indexOf("Construído em")
			if(index != -1) {
				texto += " "
				texto += div.text().substring(index, index+19);
			}
			div.html(texto);
		});
	});	

	$("#view-type-toolbar-buttons > li.dropdown-menu > ul > li").on("click", function() {
		location.reload();
	});
});

