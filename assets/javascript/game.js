$(document).ready(function() {
	var gameStarted  = false;
	var gameEnded    = false;
	var fightStarted = false;
	var fightEnded   = false;
	var characters   = ["Yoda", "Spacetrooper", "Luke", "Darth_Vader", "R2D2"];
	var lives        = [180, 100, 120, 150, 100];
	var enemies      = [];
	var chosenCharacter;
	var chosenCharacterLife;
	var newChosenCharacterLife;
	var enemy;
	var enemyLife;
	var newEnemyLife;
	var wins   = 0;
	var losses = 0;
	var n      = -2;

	function reset() {
		gameStarted  = false;
		gameEnded    = false;
		fightStarted = false;
		fightEnded   = false;
		characters   = ["Yoda", "Spacetrooper", "Luke", "Darth_Vader", "R2D2"];
		lives        = [180, 100, 120, 150, 100];
		enemies      = [];
		n = -2;

		$("[id=" + chosenCharacter.attr("data-charname") + "_life]").text(chosenCharacterLife);
		$("[id=" + enemy.attr("data-charname") + "_life]").text(enemyLife);

		$("body").css({
			"background-image": "url(\"assets/images/Background.jpg\")",
		});
		$(".score").css({
				"display": "none"
		});
		for (var i = 0; i < characters.length; i++) {
			position     = $("[data-charname=" + characters[i] + "]").position();
			moveLeft = ($(window).width() - 234 * characters.length) / 2 + 234 * i - position.left;
			moveTop = 270 - position.top;
			$("[data-charname=" + characters[i] + "]").attr("class", "character hvr-pulse-grow");
			$("[data-charname=" + characters[i] + "]").html("<img src=\"assets/images/" + characters[i] + ".png\">\n<p id=\"" + characters[i] + "_name\">" + characters[i] + "</p>\n<p id=\"" + characters[i] + "_life\">" + lives[i] + "</p>");

			$("[id=" + characters[i] + "_img]").animate({
				height: "280px"
			});
			$("[data-charname=" + characters[i] + "]").animate({
				top  : "+=" + moveTop,
				left : "+=" + moveLeft
			});

			$("[id=" + characters[i] + "_name], [id=" + characters[i] + "_life]").animate({
				"font-size": "20px"
			});
		}
		$(".title").animate({
				top: "+=50"
		});
		position = $(".instructions").position();
		moveTop = 796 - position.top;
		$(".instructions").animate({
				top: "+=" + moveTop,
		});
		$(".instructions").html("<p>Click on a character to start playing...</p>");
	}

	$(".character").on("click", function() {
		if (gameStarted === false && gameEnded === false) {
			chosenCharacter = $(this);
			$(".title").animate({
				top: "-=50"
			});

			$(".instructions").animate({
				top: "-=150"
			});
			$(".instructions").text("Select an enemy...");

			// Move chosen character
			var position = chosenCharacter.position();
			var moveLeft = ($(window).width() - $(this).width()) / 2 - position.left;
			var moveTop = 120 - position.top;
			chosenCharacter.animate({
				left : "+=" + moveLeft,
				top  : "+=" + moveTop,
			});
			chosenCharacter.removeClass("hvr-pulse-grow");

			// Set character life value
			var indexChosenCharacter = characters.indexOf(chosenCharacter.attr("data-charname"));
			chosenCharacterLife = lives[indexChosenCharacter];
			newChosenCharacterLife =  chosenCharacterLife;

			// Remove character from available characters
			characters.splice(indexChosenCharacter, 1);
			lives.splice(indexChosenCharacter, 1);

			// Move enemies
			for (var i = 0; i < characters.length; i++) {
				$("[data-charname=" + characters[i] + "]").attr("class", "enemy hvr-pulse-shrink");
				position = $("[data-charname=" + characters[i] + "]").position();
				moveLeft = ($(window).width() - $(this).width() * characters.length) / 2 + $(this).width() * i - position.left;
				moveTop = 640 - position.top;
				$("[id=" + characters[i] + "_img]").animate({
					height: "120px"
				});
				$("[data-charname=" + characters[i] + "]").animate({
					left : "+=" + moveLeft,
					top  : "+=" + moveTop,
				});
				$("[id=" + characters[i] + "_name], [id=" + characters[i] + "_life]").animate({
					"font-size": "12px"
				});
			}
			gameStarted = true;
		}
		if (fightStarted === false && gameEnded === false) {
			n++;
			console.log("n", n);
		}
		$("body").css({
			"background-image": "url(\"assets/images/Fight_Background.jpg\")",
		});
	});

	// Select enemy
	$(document).on("click", ".enemy", function() {
		if (n > -1 && gameStarted === true && fightStarted === false && gameEnded === false) {
			console.log("this is n: " + n);
			fightEnded = false;
			enemy = $(this);
			enemies.push(enemy);

			// Move character to the left
			if (n === 0) {
				position = chosenCharacter.position();
				moveTop = 0 - position.top;
				chosenCharacter.animate({
					left: "-=250",
					top: "+=" + moveTop,
				});
				$(".instructions").css({
					top: "-=150"
				});
			}

			// Remove previous enemy and reset character"s life
			if (n > 0) {
				(enemies[(n-1)]).html("");
				newChosenCharacterLife = chosenCharacterLife;
				$("[id=" + chosenCharacter.attr("data-charname") + "_life]").text(newChosenCharacterLife);
			}

			// Move enemy up
			$("[id=" + enemy.attr("data-charname") + "_img]").animate({
				height : "280px"
			});
			position = enemy.position();
			if (n === 0) {
				moveLeft = chosenCharacter.position().left + 250 - position.left;
				moveTop = 0 - position.top;
			}

			else {
				moveLeft = chosenCharacter.position().left + 500 - position.left;
				moveTop = 150 - position.top;
			}

			enemy.animate({
				left   : "+=" + moveLeft,
				top    : "+=" + moveTop,
			});

			$("[id=" + enemy.attr("data-charname") + "_name], [id=" + enemy.attr("data-charname") + "_life]").animate({
				"font-size": "20px"
			});
			$("[id=" + enemy.attr("data-charname") + "_name], [id=" + enemy.attr("data-charname") + "_life]").css({
				left : 0,
			});
			enemy.removeClass("hvr-pulse-shrink");

			// Set enemy life value
			var indexChosenEnemy = characters.indexOf(enemy.attr("data-charname"));
			enemyLife = lives[indexChosenEnemy];
			newEnemyLife = enemyLife;

			// Remove enemy from available characters
			characters.splice(indexChosenEnemy, 1);
			lives.splice(indexChosenEnemy, 1);

			// Move other enemies
			for (var i = 0; i < characters.length; i++) {
				position     = $("[data-charname=" + characters[i] + "]").position();
				moveLeft     = 640 + 100 * n + 200 * i - position.left;
				if (n === 0) {
					moveTop      = 490 - position.top;
					$("[data-charname=" + characters[i] + "]").css({
						top: "+=" + moveTop,
					});
				}
				$("[data-charname=" + characters[i] + "]").animate({
					left: "+=" + moveLeft
				});
			}

			$(".instructions").text("Hit Space to attack...");
			fightStarted = true;
			$("#wins").text(wins);
			$("#losses").text(losses);
			$(".score").css({
				'display': 'inline'
			});
			$(".container").css({
				"height": $(window).height() + "px",
			});
		}
	});

	// Attack
	document.onkeyup = function(event) {
		if (fightStarted === true && event.key === " ") {
			var attack = (Math.floor(Math.random() * 15) + 1) * Math.floor(Math.pow(1.40, n));
			var enemyAttack = Math.floor(Math.random() * 15) + 1;

			// Update characters" lives
			newChosenCharacterLife -= enemyAttack;
			newEnemyLife -= attack;
			$(".instructions").html("<p>You attacked "+ enemy.attr("data-charname") + " for " + attack + " damage</p>\n<p>" + enemy.attr("data-charname") + " attacked you back for " + enemyAttack + " damage</p>");

			if (newChosenCharacterLife > 0) {
				$("[id=" + chosenCharacter.attr("data-charname") + "_life]").text(newChosenCharacterLife);
			}

			// User losses
			else {
				$("[id=" + chosenCharacter.attr("data-charname") + "_life]").text(0);
				$(".instructions").html("<p>You lost! Press Enter to play again...</p>");
				if (newEnemyLife > 0) {
					gameEnded = true;
					gameStarted = false;
				}
				fightEnded = true;
				fightStarted = false;
				losses++;
				$("#wins").text(wins);
				$("#losses").text(losses);
			}

			if (newEnemyLife > 0) {
				$("[id=" + enemy.attr("data-charname") + "_life]").text(newEnemyLife);
			}

			// User wins
			else {
				$("[id=" + enemy.attr("data-charname") + "_life]").text(0);
				if (enemies.length === 4) {
					$(".instructions").html("<p>You won! Press Enter to play again...</p>");
					gameEnded = true;
					gameStarted = false;
					wins++;
					$("#wins").text(wins);
					$("#losses").text(losses);
				}
				else {
					$(".instructions").html("<p>You defeated " + enemy.attr("data-charname") + " .</p>\n<p>Your strength has been increased by 40 percent</p>");
				}
				fightEnded = true;
				fightStarted = false;
			}
		}

		if (gameEnded === true && event.key === "Enter") {
			reset();
		}
	};
});