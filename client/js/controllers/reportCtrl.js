/**
 * Created by Jhonny on 04/12/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('reportCtrl', function ($scope,Sessions,$routeParams,regionManager,signIn,Audits) {
        $scope.sessions = [];
		$scope.audits = [];
		$scope.dataAudits = [0,0,0,0,0,0,0,0,0,0,0,0];// for the graphics, a vector with every month
		$scope.dataAuditsPending = [0,0,0,0,0,0,0,0,0,0,0,0];
        $scope.totalUsers = 0;
        $scope.countAssessor = 0;
        $scope.countManager = 0;
		$scope.showAlertProcessUsers = true;
		$scope.showAlertProcessAudits = true;

        $scope.loadInformation = function(){
            $scope.id = $routeParams.id;
			$scope.showAlertProcessUsers = true;

            regionManager.getActive($scope.id)
            .then(function(data){
                angular.copy(data,$scope.company);

                Sessions.get($scope.company.region)
                .then(function(data){
                    angular.copy(data,$scope.sessions);
					console.log(data);
                })
                .catch(function(data){
                    console.log(data);
                });

				Audits.get($scope.company.region)
				.then(function(data){
					var toReturn = [];
					data.forEach(function(element){
						element.completed  = 0;
						element.pending  = 0;
						for(var i = 0; i < data.length; i++){
							if(data[i].username == element.username){ console.log(data[i].status);
								if(data[i].status == "Completed") element.completed++;
								if(data[i].status == "Pending") element.pending++;
							}
						}
						var flag = false;
						//search if the item is already in the list
						//if is not add to show
						toReturn.forEach(function(added){
							if(element.username == added.username) flag= true;
						});
						if(!flag)
							toReturn.push(element);

						//filling for the graphic
						var date = new Date(element.createdAt);
						if(element.status == "Completed")
							switch(date.getMonth()) {
								case 0: $scope.dataAudits[0]++; break;
								case 1: $scope.dataAudits[1]++; break;
								case 2: $scope.dataAudits[2]++; break;
								case 3: $scope.dataAudits[3]++; break;
								case 4: $scope.dataAudits[4]++; break;
								case 5: $scope.dataAudits[5]++; break;
								case 6: $scope.dataAudits[6]++; break;
								case 7: $scope.dataAudits[7]++; break;
								case 8: $scope.dataAudits[8]++; break;
								case 9: $scope.dataAudits[9]++; break;
								case 10: $scope.dataAudits[10]++; break;
								case 11: $scope.dataAudits[11]++; break;
								default:break;
							}
						if(element.status == "Pending")
							switch(date.getMonth()) {
								case 0: $scope.dataAuditsPending[0]++; break;
								case 1: $scope.dataAuditsPending[1]++; break;
								case 2: $scope.dataAuditsPending[2]++; break;
								case 3: $scope.dataAuditsPending[3]++; break;
								case 4: $scope.dataAuditsPending[4]++; break;
								case 5: $scope.dataAuditsPending[5]++; break;
								case 6: $scope.dataAuditsPending[6]++; break;
								case 7: $scope.dataAuditsPending[7]++; break;
								case 8: $scope.dataAuditsPending[8]++; break;
								case 9: $scope.dataAuditsPending[9]++; break;
								case 10: $scope.dataAuditsPending[10]++; break;
								case 11: $scope.dataAuditsPending[11]++; break;
								default:break;
							}
						initGraphicAudits();
						$scope.showAlertProcessAudits = false;

					});


					angular.copy(toReturn,$scope.audits);
					console.log($scope.audits);

				})
				.catch(function(data){
					console.log(data);
				});


                signIn.countUsers($scope.company.region)
                .then(function(data){
                    $scope.totalUsers = data - 1;//reduce 1 because not count the regional manager

					signIn.countAssessor($scope.company.region)
					.then(function(data){
						$scope.countAssessor = data;

						signIn.countManagers($scope.company.region)
						.then(function(data){
							$scope.countManager = data;
							$scope.showAlertProcessUsers = false;
							initGraphic();
						})
						.catch(function(data){
							console.log(data)
						});


					})
					.catch(function(data){
						console.log(data)
					});


				})
				.catch(function(data){
					console.log(data)
				});


            })
            .catch(function(data){
                //$location.path("/");
            });


        }

		var initGraphic = function(){
			// Get the context of the canvas element we want to select
			var ctx = document.getElementById("myChart").getContext("2d");
			// And for a doughnut chart
			//var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);
			var data = [
				{
					value: $scope.countAssessor ,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Assessors",
					labelColor : 'white',
					labelFontSize : '16'
				},
				{
					value: $scope.countManager,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Managers",
					labelColor : 'white',
					labelFontSize : '16'
				},
				{
					value: 1,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Region Manager",
					labelColor : 'white',
					labelFontSize : '16'
				}
			];

			var options = {
				//Boolean - Whether we should show a stroke on each segment
				segmentShowStroke : true,

				//String - The colour of each segment stroke
				segmentStrokeColor : "#fff",

				//Number - The width of each segment stroke
				segmentStrokeWidth : 2,

				//Number - The percentage of the chart that we cut out of the middle
				percentageInnerCutout : 50, // This is 0 for Pie charts

				//Number - Amount of animation steps
				animationSteps : 100,

				//String - Animation easing effect
				animationEasing : "easeOutBounce",

				//Boolean - Whether we animate the rotation of the Doughnut
				animateRotate : true,

				//Boolean - Whether we animate scaling the Doughnut from the centre
				animateScale : false,

				//String - A legend template
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

			};
			// For a pie chart
			var myPieChart = new Chart(ctx).Pie(data,options);

			document.getElementById('js-legend').innerHTML = myPieChart.generateLegend();

		}



		var initGraphicAudits = function(){
			// Get the context of the canvas element we want to select
			var ctxAudits = document.getElementById("myChartAudits").getContext("2d");

			var data = {
				labels: ["January", "February", "March", "April", "May", "June", "July","Augut","September","October","November","December"],
				datasets: [
					{
						label: "Pending",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "rgba(220,220,220,1)",
						pointColor: "rgba(220,220,220,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: $scope.dataAuditsPending
					},
					{
						label: "Completed",
						fillColor: "rgba(151,187,205,0.2)",
						strokeColor: "rgba(151,187,205,1)",
						pointColor: "rgba(151,187,205,1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: $scope.dataAudits
					}
				]
			};

			var options = {

				///Boolean - Whether grid lines are shown across the chart
				scaleShowGridLines : true,

				//String - Colour of the grid lines
				scaleGridLineColor : "rgba(0,0,0,.05)",

				//Number - Width of the grid lines
				scaleGridLineWidth : 1,

				//Boolean - Whether to show horizontal lines (except X axis)
				scaleShowHorizontalLines: true,

				//Boolean - Whether to show vertical lines (except Y axis)
				scaleShowVerticalLines: true,

				//Boolean - Whether the line is curved between points
				bezierCurve : true,

				//Number - Tension of the bezier curve between points
				bezierCurveTension : 0.4,

				//Boolean - Whether to show a dot for each point
				pointDot : true,

				//Number - Radius of each point dot in pixels
				pointDotRadius : 4,

				//Number - Pixel width of point dot stroke
				pointDotStrokeWidth : 1,

				//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
				pointHitDetectionRadius : 20,

				//Boolean - Whether to show a stroke for datasets
				datasetStroke : true,

				//Number - Pixel width of dataset stroke
				datasetStrokeWidth : 2,

				//Boolean - Whether to fill the dataset with a colour
				datasetFill : true,

				//String - A legend template
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

			};
			// For a pie chart
			var myAuditsChart = new Chart(ctxAudits).Line(data, options);

			document.getElementById('js-legend-audits').innerHTML = myAuditsChart.generateLegend();

		}
    });

