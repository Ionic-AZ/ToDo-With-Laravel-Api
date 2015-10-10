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
    $response->header('access-control-allow-origin','*');
});

 Route::group(['prefix' => 'api', 'after' => 'allowOrigin'], function() {
     Route::get('/projects/', function () {
         return Response::json(['status' => 200,'projects' => Project::all()                 
         ]);
     });
 
    Route::get('/projects/{page}', function ($page) {
        return Response::json(['status' => 200,'projects' => Project::skip(($page - 1) * 2)
                ->take(2)
                ->get(['id', 'name', 'created_at', 'updated_at', 'slug'])->toArray()
        ]);
    });
  
    Route::get('/project/{id}', function ($id) {
        $project = project::find($id);
        //out going format: {"status":200,"poll":{"id":"1","question":"What is your preferred framework for 2014 ?","options":["Laravel","PhalconPHP","CakePHP"]}}
        return Response::json(['status' => 200, 'project' => $project ->toArray()]);
    });

	Route::post('/projects', function(){
		$project = new Project;
		$project->name = Request::get('name');
		$project->slug = Request::get('slug');
		$project->created_at = new DateTime;
		$project->updated_at = new DateTime; 
		
		$project->save();
		
		return Response::json([
			'status' => 200,
			'projects' => Project::all()
		]);
	});
	
	
//  
//     Route::post('/project/{id}/task', function ($projectId) {
//         $name = Input::get('name');
// 		$slug = Input::get('slug');
// 		$completed = Input::get('completed');
// 		$description = Input::get('description');
// 		$created_at = new DateTime();
// 		$updated_at = new DateTime();
//         $project = Project::find($projectId);
//         $tasks = implode(',', $project->options);
//         $rules = [
//             'option' => 'in:' . $options,
//         ];
//         $valid = Validator::make(compact('option'), $rules);
//         if ($valid->passes()) {
//             $poll->stats()->where('option','=',$option)->increment('vote_count');
//             return Response::json(['status' => 200, 'mesg' => 'saved successfully!']);
//         } else
//             return Response::json(['status' => 400, 'mesg' => 'option not allowed!'],400);
//  
//     });
//  
    Route::post('/project/{id}/tasks', function ($id) {
        $project = Project::find($id);
		
    	$task = new Task;
		$task ->project_id = $id;
		$task ->name = Request::get('name');
		$task ->slug = Request::get('slug');
		$task ->completed = Request::get('completed');
		$task ->description = Request::get('description');		
		$task ->created_at = new DateTime;
		$task ->updated_at = new DateTime; 
		
		$task ->save();
        $tasks = $project->tasks()->get()->toArray();
		
        return Response::json(['status' => 200, 'tasks' => $tasks]);
    });

    Route::get('/project/{id}/tasks', function ($id) {
        $project = Project::find($id);
        $tasks = $project->tasks()->get()->toArray();
             //->select(['id', 'name'])
             //->get()->toArray();
        return Response::json(['status' => 200, 'tasks' => $tasks]);
    });
 });