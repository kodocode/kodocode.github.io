
(function(){

	var app = angular.module('gameDirectory', []);
	
	app.controller('UserController', ['$http', function($http){
		var userController = this;

		this.timeoutLoop = {};
		this.user = {};
		this.userProfileXML = {};
		this.userProfileJson = {};
		this.userGames = {};
		this.gameDisplay = [];
		this.validDisplay = false;

		this.lookupUser = function(userID) {
			

			this.user = userID;
			var httpString = 'http://www.boardgamegeek.com/xmlapi/collection/'+this.user+'?own=0 -';
			
			$http.get(httpString).success(function(data, status, headers, config){
			// Notes from BGG:
			// I have updated the exporting of collections function to take it "out of band". What this means is that when you make a request to export your collection in CSV or using the XML API it will get queued on our backend servers. 
			// Those servers will then generate the file and save it, so that you can download it over and over without having to wait for the generation time again (which can be quite long for large collections).
			// This also means that API developers need to watch for the HTTP 202 response code when they request a collection that gets queued for generation.
			// Also, since a lot of the data in a collection for the API is dynamic (based on stats, rankings, etc...) we will hard expire them after 7 days. If you make changes to your collection - the data will be expired and you'll have to wait for the queue to export the collection again.

			 	userController.userProfileXML = data;
			 

			 	if(status == 200){
			 		//Call next step function and return

			 		userController.parseData();
			 	}
			 	else{
			 		//call function again with timeout. 
			 		setTimeout(function(){userController.lookupUser(userID)}, 5000);
			 	}

			});
			//Instantiace call to get user id. 
		};

		this.parseData = function(){

			userController.userProfileJson = $.xml2json(userController.userProfileXML, true);
			userController.userGames = userController.userProfileJson.item;
			userController.gameDisplay = [];
			userController.validDisplay = false;
			
			console.log(userController.userGames);

			// for each game item, set game data. 
			for(i=0; i<userController.userGames.length; i++){
				setGameDisplay(userController.userGames[i]);
			}

			userController.validDisplay = true;
		}

		this.greaterThan = function(prop, val){
		    return function(item){
		      return item[prop] >= val;
		    }
		}

		this.lessThan = function(prop, val){
			console.log(prop);
			console.log('Prop: '+prop+ ". Val: "+val);
		    return function(item){
		    	console.log(item[prop] <= val);
		      return item[prop] <= val;
		    }
		}

		function setGameDisplay(rawGame){			
			var newGame = {};
			newGame.name = getNewGameName(rawGame);
			newGame.playerMin = getNewGamePlayerMin(rawGame);
			newGame.playerMax =  getNewGamePlayerMax(rawGame);
			newGame.playTime = getNewGamePlaytime(rawGame);
			newGame.thumbnail = getNewGameThumbnail(rawGame);
			newGame.ID = getNewGameID(rawGame);

			userController.gameDisplay.push(newGame);
		}

		function getNewGameID(rawGame){
			var gameID = "";
			gameID = rawGame.objectid;
			return gameID;
		}

		function getNewGameName(rawGame){
			var name = "";
			name = rawGame.name[0].text;
			return name;
		}

		function getNewGamePlayerMin(rawGame){
			var playerMin = "";
			playerMin = rawGame.stats[0].minplayers;
			return playerMin;
		}

		function getNewGamePlayerMax(rawGame){
			var playerMax = "";
			playerMax = rawGame.stats[0].maxplayers;
			return playerMax;
		}

		function getNewGamePlaytime(rawGame){
			var playtime = "";
			playtime = rawGame.stats[0].playingtime;
			return playtime;
		}

		function getNewGameThumbnail(rawGame){
			var thumbnail = "";
			thumbnail = rawGame.thumbnail[0].text;
			return thumbnail;
		}		

	}]);


})();