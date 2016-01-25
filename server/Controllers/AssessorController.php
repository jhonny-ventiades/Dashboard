<?php namespace App\Controllers;

use Parse\ParseUser;
use Parse\ParseClient;
use Parse\ParseSessionStorage;
use Parse\ParseQuery;
use Parse\ParseObject;

class AssessorController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public  function get($region) {
        $app = \Slim\Slim::getInstance();
		$res = $app->response();
		$res['Content-Type'] = 'application/json';
        try{
            $query = ParseUser::query();

            $queryDesignationAssesor =  ParseUser::query();
            $queryDesignationAssesor->equalTo("Designation","Manager");

            $queryDesignationManager = ParseUser::query();
            $queryDesignationManager->equalTo("Designation","Assessor");

            $mainQuery = ParseQuery::orQueries([$queryDesignationManager, $queryDesignationManager]);

            $mainQuery->equalTo("Region", $region);
            $results = $mainQuery->find();
            //$results = $query->find();

            $stack = array();
            // Do something with the returned ParseObject values
            for ($i = 0; $i < count($results); $i++) {
              array_push($stack,$this->convertPhpParseObjectUser($results[$i]));
            }

            $res->body(json_encode($stack));
		    return $res;
            // Do stuff after successful login.
        } catch (ParseException $error) {
            // The login failed. Check error to see why.
            $res->body(json_encode($error));
		    return $res;
        }
    }

    public function create() {
        $app = \Slim\Slim::getInstance();
		$res = $app->response();
		$res['Content-Type'] = 'application/json';
        try{

        $assessor = json_decode($app->request->getBody());

        $gameScore = new ParseObject("_User");
        $gameScore->set("username",        $assessor->username);
        $gameScore->set("Name",        $assessor->username);
        $gameScore->set("password",        $assessor->password);
        $gameScore->set("mail",        $assessor->email);
        $gameScore->set("Region",        $assessor->region);
        $gameScore->set("Phone",        $assessor->phone);
        $gameScore->set("Address",        $assessor->address);
        $gameScore->set("Branch",        $assessor->branch);
            if($assessor->designation == "assessor") $assessor->designation = "Assessor";
            else if($assessor->designation == "manager") $assessor->designation = "Manager";
            else if($assessor->designation == "region_manager") $assessor->designation = "Regional_Manager";
        $gameScore->set("Designation",        $assessor->designation);
        $gameScore->set("Company_Name",        $assessor->company_name);
        $gameScore->set("Uncrypt_Password",        $assessor->password);
        $gameScore->set("Visible",        true);


        $gameScore->save();
        $res->body(json_encode($this->convertPhpParseObjectUser($gameScore)));
		return $res;
       // Do stuff after successful login.
        } catch (ParseException $error) {
            // The login failed. Check error to see why.
            $res->body(json_encode($error));
		    return $res;
        }
    }


    public function convertPhpParseObjectUser($object){
     return array("id"=>$object->getObjectId(),
                  "username"=>$object->get("username"),
                                    "branch"=>$object->get("Branch"),
                                    "region"=>$object->get("Region"),
                                    "designation"=>$object->get("Designation"),
                                    "email"=>$object->get("Email"),
                                    "address"=>$object->get("address"),
                                    "company_name"=>$object->get("company_name"),
                                    "phone"=>$object->get("phone"),
                                    "uncrypt_password"=>$object->get("uncrypt_password"),
                                    "region"=>$object->get('Region'));
    }

}
?>
