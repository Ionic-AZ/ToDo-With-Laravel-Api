<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
use App\Project;
use App\Task;

Route::get('/', function () {
    return view('welcome');
});

Route::filter('allowOrigin', function($route, $request, $response) 
{
	// $response->headers->set('Access-Control-Allow-Origin', '*');
});

Route::group(['prefix' => 'api', 'after' => 'allowOrigin'], function() {
    
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::post('register', 'AuthenticateController@register');
});

 Route::group(['prefix' => 'api', 'after' => 'allowOrigin', 'middleware' => 'jwt.auth'], function() {
    
     Route::get('/projects/', function () {
         $user = JWTAuth::parseToken()->authenticate();
         $projects = Project::where('user_id', $user->id) ->get();

         return Response::json(['status' => 200,'projects' => $projects ]);
     });
 
    Route::get('/project/{id}', function ($id) {        
         $user = JWTAuth::parseToken()->authenticate();
         $project = Project::where('user_id', $user->id)->where('id',$id)->first();
        return Response::json(['status' => 200, 'project' => $project ->toArray()]);
    });

	Route::post('/projects', function(){
        $user = JWTAuth::parseToken()->authenticate();
        
		$project = new Project;
		$project->name = Request::get('name');
        $project->user_id = $user->id;
		$project->created_at = new DateTime;
		$project->updated_at = new DateTime; 
		
		$project->save();
		
		return Response::json([
			'status' => 200,
			'project' => $project
		]);
	});
	
    Route::delete('project/{id}', function($id){
        $user = JWTAuth::parseToken()->authenticate();
        $project = Project::where('user_id', $user->id)->where('id',$id)->first();
        if ($project){
            Project::destroy($project->id);
            return Response::json(['status' => 200, 'Deleted']);
        } else {
            return Response::json('Unauthorized', 403);
        }
        
    });
	
    Route::post('/project/{id}/tasks', function ($id) {
        $user = JWTAuth::parseToken()->authenticate();
        $project = Project::where('user_id', $user->id)->where('id',$id)->first();

		
    	$task = new Task;
		$task ->project_id = $id;
		$task ->name = Request::get('name');
		$task ->completed = Request::get('completed');
		$task ->created_at = new DateTime;
		$task ->updated_at = new DateTime; 
		
		$task ->save();
        // $tasks = $project->tasks()->get()->toArray();
		
        return Response::json(['status' => 200, 'task' => $task]);
    });

    Route::get('/project/{id}/tasks', function ($id) {
        $user = JWTAuth::parseToken()->authenticate();
        $project = Project::where('user_id', $user->id)->where('id',$id)->first();
        $tasks = $project->tasks()->get()->toArray();
        return Response::json(['status' => 200, 'tasks' => $tasks]);
    });
    
    Route::post('/project/{id}/task/{taskid}', function($id, $taskid){
        $user = JWTAuth::parseToken()->authenticate();
        $project = Project::where('user_id', $user->id)->where('id',$id)->first();
        $task = $project->tasks()->where('id', $taskid)->first();
        if($task){
            $task->completed=Request::get('completed');
            $task->save();
            return $task;
        }else{
            return response('Unauthorized',403);
        } 
    });
    
      Route::delete('project/{id}/task/{taskid}', function($id){
        $user = JWTAuth::parseToken()->authenticate();
        $project = Project::where('user_id', $user->id)->where('id',$id)->first();
        $task = $project->tasks()->where('id', $taskid)->first();
        if ($task){
            Task::destroy($task->id);
            return Response::json(['status' => 200, 'Deleted']);
        } else {
            return Response::json('Unauthorized', 403);
        }        
    });
 });