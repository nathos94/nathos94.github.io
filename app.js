var app = {

	hiraCurrentIndex: 0,
	kataCurrentIndex: 0,
	strikes: 0,

	romanji: ["a","i","u","e","o","ka","ki","ku","ke","ko","sa","shi","su","se","so","ta","chi","tsu","te","to","na","ni","nu","ne","no","ha","hi","fu","he","ho","ma","mi","mu","me","mo","ya","yu","yo","ra","ri","ru","re","ro","wa","wo","ga","gi","gu","ge","go","za","ji","zu","ze","zo","da","ji","zu","de","do","ba","bi","bu","be","bo","pa","pi","pu","pe","po"],
	hiragana: ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ"],
	katakana: ["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","パ","ピ","プ","ペ","ポ"],
	init: function() {

		app.randomise("hiragana");
		app.randomise("katakana");
		app.controls();

	},

	controls: function() {

		$('.btn-hiragana').click(function() {
			$('.hiragana').show();
			$('.katakana').hide();
			$('.btn-hiragana').addClass("active");
			$('.btn-katakana').removeClass("active");
		});

		$('.btn-katakana').click(function() {
			$('.hiragana').hide();
			$('.katakana').show();

			$('.btn-hiragana').removeClass("active");
			$('.btn-katakana').addClass("active");
		});

		$(".romanji").keyup(function (e) {
		    if (e.keyCode == 13) {
		        e.preventDefault();
		        var value = $(this).val();
		        var alpha = $(this).attr('data-type');
		        var current_index = 0;
		        if (alpha == "hiragana") {
		        	current_index = app.hiraCurrentIndex;
		        } else {
		        	current_index = app.kataCurrentIndex;
		        }
		        if (value == app.romanji[current_index]) {
		        	$("." + alpha).find('.status').text('Correct');
		        	app.randomise($(this).attr('data-type'));
		        	app.strikes = 0;
		        } else if (value != app.romanji[current_index]) {
		        	$("." + alpha).find('.status').text('Wrong - Try Again');
		        	app.strikes++;
		        }
		        if (app.strikes == 3) {
		        	$("." + alpha).find('.status').text('Correct answer is ' + app.romanji[current_index]);
		        	app.strikes = 0;
		        }
		        $(this).val("");
		    }
		});

	},

	randomise: function(type) {

		var alphabet = [];
		switch (type) {
			case "hiragana":
				alphabet = app.hiragana;
				break;
			case "katakana":
				alphabet = app.katakana;
				break;
			default:
				alphabet = app.hiragana;
				break;
		}

		var total_chars = alphabet.length;
		var random_number = Math.floor(Math.random() * total_chars);
		if (type == 'hiragana') {
			app.hiraCurrentIndex = random_number;
		} else {
			app.kataCurrentIndex = random_number;
		}
		
		$("." + type).find(".character").text(alphabet[random_number]);

	}

}