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
		// newChosenCharacterLife;
		// newEnemyLife;
		// wins = 0,
		// losses = 0,
		n = -2;
		$("[id=" + chosenCharacter.attr("data-charname") + "_life]").text(chosenCharacterLife);
		$("[id=" + enemy.attr("data-charname") + "_life]").text(enemyLife);

		$("body").css({
			"background-image": "url(\"assets/images/Background.jpg\")",
			"background-size": "cover"
		});
		$(".score").css({
				"display": "none"
		});
		for (var i = 0; i < characters.length; i++) {
			position     = $("[data-charname=" + characters[i] + "]").position();
			moveLeft     = 328 + 228 * i - position.left;
			moveTop      = 400 - position.top;
			$("[data-charname=" + characters[i] + "]").attr("class", "character hvr-pulse-grow");
			$("[data-charname=" + characters[i] + "]").html("<img src=\"assets/images/" + characters[i] + ".png\">\n<p id=\"" + characters[i] + "\">" + characters[i] + "</p>\n<p id=\"" + characters[i] + "_life\">" + lives[i] + "</p>");

			$("[data-charname=" + characters[i] + "]").animate({
				height: "40%"
			});
			$("[data-charname=" + characters[i] + "]").animate({
				top  : "+=" + moveTop,
				left : "+=" + moveLeft
			});

			$("[id=" + characters[i] + "], [id=" + characters[i] + "_life]").animate({
				"font-size": "20px"
			});
			$('[id=' + characters[i] + '], [id=' + characters[i] + '_life]').css({
				top  : 380,
				left : 0,
			});
		}
		$(".title").animate({
				top: "+=50"
		});
		$(".instructions").animate({
				top: "+=350"
		});
		$(".instructions").html("<p>Click on a character to start playing...</p>");
	}

	// Select character
	$(".character").on("click", function() {
		if (gameStarted === false && gameEnded === false) {
			chosenCharacter = $(this);
			$(".title").animate({
				top: "-=50"
			});

			$(".instructions").animate({
				top: "-=200"
			});
			$(".instructions").text("Select an enemy...");

			// Move chosen character
			var position = chosenCharacter.position();
			var moveLeft = position.left - 784;
			var moveTop = position.top - 200;
			chosenCharacter.animate({
				top  : "-=" + moveTop,
				left : "-=" + moveLeft
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
				$("[data-charname=" + characters[i] + "]").removeClass("hvr-pulse-grow");
				$("[data-charname=" + characters[i] + "]").addClass("hvr-pulse-shrink");
				position = $("[data-charname=" + characters[i] + "]").position();
				moveLeft = 540 + 200 * i - position.left;
				moveTop = 750 - position.top;
				$("[data-charname=" + characters[i] + "]").animate({
					height: "20%"
				});
				$("[data-charname=" + characters[i] + "]").animate({
					top  : "+=" + moveTop,
					left : "+=" + moveLeft
				});
				$("[id=" + characters[i] + "], [id=" + characters[i] + "_life]").animate({
					"font-size": "12px"
				});
				$("[id=" + characters[i] + "], [id=" + characters[i] + "_life]").css({
					top  : 180,
					left : -60,
				});
			}
			gameStarted = true;
		}
		if (fightStarted === false && gameEnded === false) {
			n++;
		}
		$("body").css({
			"background-image": "url(\"assets/images/Fight_Background.jpg\")",
			"background-size": "cover"
		});
	});

	// Select enemy
	$(".character").on("click", function() {
		if (n > -1 && gameStarted === true && fightStarted === false && gameEnded === false) {
			fightEnded = false;
			enemy = $(this);
			enemies.push(enemy);

			// Move character to the left
			if (n === 0) {
				position = chosenCharacter.position();
				moveLeft = position.left - 200;
				chosenCharacter.animate({
					left: "-=250"
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
			position = enemy.position();
			moveLeft = position.left - 1034;
			moveTop = position.top - 215;
			enemy.animate({
				top    : "-=" + moveTop,
				left   : "-=" + moveLeft,
				height : "40%"
			});
			$("[id=" + enemy.attr("data-charname") + "], [id=" + enemy.attr("data-charname") + "_life]").animate({
				"font-size": "20px"
			});
			$("[id=" + enemy.attr("data-charname") + "], [id=" + enemy.attr("data-charname") + "_life]").css({
				top  : 380,
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
				moveTop      = 750 - position.top;
				$("[data-charname=" + characters[i] + "]").animate({
					height: "20%"
				});
				$("[data-charname=" + characters[i] + "]").animate({
					top: "+=" + moveTop,
					left: "+=" + moveLeft
				});
				$("[id=" + characters[i] + "], [id=" + characters[i] + "_life]").animate({
					"font-size": "12px"
				});
				$("[id=" + characters[i] + "], [id=" + characters[i] + "_life]").css({
					top: 180,
					left: -60,
				});
			}

			$(".instructions").text("Hit Space to attack...");
			fightStarted = true;
			$("#wins").text(wins);
			$("#losses").text(losses);
			$(".score").css({
				'display': 'inline'
			});
		}
	});

	// Attack
	document.onkeyup = function(event) {
		if (fightStarted === true && event.key === " ") {
			// I chose to make the attacks a random value, because if it's a fixed value
			// as the instructions indicate then the user could always choose the enemies
			// from weaker to stronger and they would always win.
			// And the user's attack is increased by a percentage after each win,
			// otherwise it would be almost impossible to win the game.
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