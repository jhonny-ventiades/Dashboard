<?php namespace App\Controllers;

use Parse\ParseUser;
use Parse\ParseClient;
use Parse\ParseSessionStorage;

use Parse\ParseQuery;

class SignInController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public  function signIn($login, $password) {
        $app = \Slim\Slim::getInstance();
		$res = $app->response();
		$res['Content-Type'] = 'application/json';
        try{
            $user = ParseUser::logIn($login, $password);
            $actual = $this->convertPhpParseObjectUser($user);
            $res->body(json_encode($actual));

            $storage = new ParseSessionStorage();
            ParseClient::setStorage( $storage );

            return $res;
            // Do stuff after successful login.
        } catch (ParseException $error) {
            // The login failed. Check error to see why.
            $res->body(json_encode($error));
		    return $res;
        }
    }

    function actualUser($id){
        $query = ParseUser::query();
        $query->equalTo("objectId", $id);
        $results = $query->find();
        if($results[0] != null)
            $actual = $this->convertPhpParseObjectUser($results[0]);
        else
            $actual = $results;

        $app = \Slim\Slim::getInstance();
		$res = $app->response();
		$res['Content-Type'] = 'application/json';
        $res->body(json_encode($actual));
        return $res;
    }

    function currentUser(){
        $currentUser = ParseUser::getCurrentUser();
        if ($currentUser) {
            $actual = $this->convertPhpParseObjectUser($currentUser);
            $app = \Slim\Slim::getInstance();
            $res = $app->response();
            $res['Content-Type'] = 'application/json';
            $res->body(json_encode($actual));
            return $res;
        } else {
            // show the signup or login page
        }
    }

    function report($region){
        $query = new ParseQuery("_User");
        $query->equalTo("Region", $region);
        $query->equalTo("Designation", "Manager");
        $managers = $query->count();

        $query = new ParseQuery("_User");
        $query->equalTo("Region", $region);
        $query->equalTo("Designation", "Assessors");
        $assessors = $query->count();

        $query = new ParseQuery("_User");
        $query->equalTo("Region", $region);
        $totalUsers = $query->count();

        $results = array('assessors' => $assessors,
                        'managers' => $managers,
                        'totalUsers' => $totalUsers,
                        'sessions' => 0);

         $app = \Slim\Slim::getInstance();
            $res = $app->response();
            $res['Content-Type'] = 'application/json';
            $res->body(json_encode($results));
            return $res;
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
