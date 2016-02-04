/**
 * Created by Jhonny on 07/09/2015.
 */

'use strict';

angular.module('dashboardApp')
    .controller('companiesCtrl', function ($scope,$location,regionManager,signIn) {
       
    $scope.regionsManagers = [];
    $scope.regionManager = {
        username:"",
        password:"",
        verify_password:"",
        email:"",
        region:"",
        phone:"",
        address:"",
        branch:"branch",
        designation:"region_manager",
        company_name:""
    };
    $scope.regionManagerEdit = {};

    $scope.createLabel = "Create Company & Corporate Leader";//change the label in header

    $scope.errorSameRegion = false;
    $scope.regionsLoaded = false;
    $scope.errorExistingEmail = false;
	$scope.showAlertProcessCreateCompany = false;
	$scope.showAlertProcessEditCompany = false;
	$scope.showAlertUserAnalytics = false;
	$scope.totalRegions = 0;
    $scope.totalAssesors = 0;
	$scope.totalManagers = 0;

    $scope.selectCompany = function(){
        $location.path("company");
    }
    
    $scope.showReport = function(id){
        $location.path("report/" + id);
    }

    $scope.loadRegionalManagersList = function(){
        regionManager.get()
        .then(function(data){
            $scope.regionsLoaded = true;
            angular.copy(data,$scope.regionsManagers);
        })
        .catch(function(data){
            console.log(data);
        });
    }

	$scope.loadStats = function(){
		$scope.showAlertUserAnalytics = true;
		signIn.countAllRegions()
                .then(function(data){
                    $scope.totalRegions = data - 1;//reduce 1 because not count the regional manager

					signIn.countAllAssessors()
					.then(function(data){
						$scope.totalAssesors = data;

						signIn.countAllManagers()
						.then(function(data){
							$scope.totalManagers = data;
							$scope.showAlertUserAnalytics = false;
							initGraphicRound();
							initGraphicBars();
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
	}

    $scope.createRegionManager = function(){
        $scope.regionManager.email = $scope.regionManager.username;
		$scope.showAlertProcessCreateCompany = true;
        regionManager.validateRegion($scope.regionManager.region)
            .then(function(data){
            // validate if there are no other fields with the same region
            if(data.length <= 0){
                regionManager.post($scope.regionManager)
                    .then(function(data){
						$scope.showAlertProcessCreateCompany = false;
                        $('#myModal').modal('hide');//hide modal
                        $scope.loadRegionalManagersList();
                        $scope.errorExistingEmail = false;
                        $scope.regionManager = {
                            username:"",
                            password:"",
                            verify_password:"",
                            email:"",
                            region:"",
                            phone:"",
                            address:"",
                            branch:"branch",
                            designation:"region_manager",
                            company_name:""
                        };

                    })
                    .catch(function(data){
						$scope.showAlertProcessCreateCompany = false;
                        if(data.code==202){
                            $("#emailTextBox").focus();
                            $scope.errorExistingEmail = true;
                        }
                    });
            }
            else{
                $scope.errorSameRegion = true;
            }
        })
        .catch(function(data){

        });
    }

    $scope.companySelected = function(company){
        angular.copy(company, $scope.company);
        $location.path("users/"+ company.id);
    }

    //copy the region manager object to the modal fields
    $scope.copyRegionManager = function(regionManger){
        angular.copy(regionManger,$scope.regionManagerEdit);
        $scope.regionManagerEdit.username = regionManger.username;
        $scope.regionManagerEdit.lastUsername = regionManger.username;
        $scope.regionManagerEdit.password = regionManger.password;
        $scope.regionManagerEdit.verify_password = regionManger.password;
        $scope.regionManagerEdit.lastEmail = regionManger.email;//email saved to have a reference to find the object
        $scope.regionManagerEdit.email = regionManger.email;
        $scope.regionManagerEdit.lastRegion = regionManger.region;//region saved to have a reference to find the object
        $scope.regionManagerEdit.region = regionManger.region;
        $scope.regionManagerEdit.phone = regionManger.phone;
        $scope.regionManagerEdit.address = regionManger.address;
        $scope.regionManagerEdit.branch = "branch";
        $scope.regionManagerEdit.designation = "region_manager";
        $scope.regionManagerEdit.company_name = regionManger.company_name;
        $scope.regionManagerEdit.uncrypt_password = regionManger.uncrypt_password;
    }

    $scope.editRegionManager = function(){
        $scope.regionManagerEdit.email = $scope.regionManagerEdit.username;
		$scope.showAlertProcessEditCompany = true;
        regionManager.validateRegion($scope.regionManagerEdit.region)
        .then(function(data){
            // validate if there are no other fields with the same region
            var flag = false;
            if($scope.regionManagerEdit.region === $scope.regionManagerEdit.lastRegion){
                flag = true;
            }else{
                if(data.length <= 0 ){
                    flag = true;
                }
                else{
                    flag = false;
                }
            }

            if(flag == true){
                regionManager.update($scope.regionManagerEdit)
                    .then(function(data){
						$scope.showAlertProcessEditCompany = false;
                        $('#editModal').modal('hide');//hide modal
                        $scope.loadRegionalManagersList();
                        $scope.regionManagerEdit = {};
                    })
                    .catch(function(data){
                        if(data.code==202){
                            $("#emailEditTextBox").focus();
                            $scope.errorExistingEmail = true;
                        }
                    });
            }
            else{
				$scope.showAlertProcessEditCompany = false;
                $scope.errorSameRegion = true;
            }
        })
        .catch(function(data){
				$scope.showAlertProcessEditCompany = false;
        });
    }

    $scope.deleteRegionManager = function(manager){ console.log(manager);
        var r = confirm("Are you sure to delete this user?");
        if (r == true) {
             regionManager.delete(manager)
                    .then(function(data){
                        $scope.loadRegionalManagersList();
                        $scope.getActualUser();
                    })
                    .catch(function(data){

                    });
        } else {
            r = "You pressed Cancel!";
        }
    }




		var initGraphicRound = function(){
			// Get the context of the canvas element we want to select
			var ctx = document.getElementById("myChartUsersRound").getContext("2d");
			// And for a doughnut chart
			//var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);
			var data = [
				{
					value: $scope.totalRegions ,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Regional Managers",
					labelColor : 'white',
					labelFontSize : '16'
				},
				{
					value: $scope.totalAssesors,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Assessors",
					labelColor : 'white',
					labelFontSize : '16'
				},
				{
					value: $scope.totalManagers,
					color: "#FDB45C",
					highlight: "#FFC870",
					label: "Managers",
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

			document.getElementById('js-legend-users').innerHTML = myPieChart.generateLegend();
		}


		var initGraphicBars = function(){
			// Get the context of the canvas element we want to select
			var ctx = document.getElementById("myChartUsersBars").getContext("2d");
			// And for a doughnut chart
			//var myDoughnutChart = new Chart(ctx[1]).Doughnut(data,options);
			var data = {
				labels: ["Users"],
				datasets: [
					{
						label: "Regional Manager",
						fillColor: "#F7464A",
						strokeColor: "rgba(220,220,220,0.8)",
						highlightFill: "rgba(220,220,220,0.75)",
						highlightStroke: "rgba(220,220,220,1)",
						data: [$scope.totalRegions]
					},
					{
						label: "Manager",
						fillColor: "#FDB45C",
						strokeColor: "rgba(151,187,205,0.8)",
						highlightFill: "rgba(151,187,205,0.75)",
						highlightStroke: "rgba(151,187,205,1)",
						data: [$scope.totalManagers]
					},
					{
						label: "Assessor",
						fillColor: "#46BFBD",
						strokeColor: "rgba(151,187,205,0.8)",
						highlightFill: "rgba(151,187,205,0.75)",
						highlightStroke: "rgba(151,187,205,1)",
						data: [$scope.totalAssesors]
					}
				]
			};

			var options = {
				//Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
				scaleBeginAtZero : true,
				//Boolean - Whether grid lines are shown across the chart
				scaleShowGridLines : true,
				//String - Colour of the grid lines
				scaleGridLineColor : "rgba(0,0,0,.05)",
				//Number - Width of the grid lines
				scaleGridLineWidth : 1,
				//Boolean - Whether to show horizontal lines (except X axis)
				scaleShowHorizontalLines: true,
				//Boolean - Whether to show vertical lines (except Y axis)
				scaleShowVerticalLines: true,
				//Boolean - If there is a stroke on each bar
				barShowStroke : true,
				//Number - Pixel width of the bar stroke
				barStrokeWidth : 2,
				//Number - Spacing between each of the X value sets
				barValueSpacing : 5,
				//Number - Spacing between data sets within X values
				barDatasetSpacing : 1,
				//String - A legend template
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
			}
			// For a pie chart
			var myBartChart = new Chart(ctx).Bar(data,options);

			document.getElementById('js-legend').innerHTML = myBartChart.generateLegend();
		}

});
