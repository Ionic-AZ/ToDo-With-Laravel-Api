// /database/migrations/seeds/TasksTableSeeder.php
<?php
 
use Illuminate\Database\Seeder;
 
class TasksTableSeeder extends Seeder {
 
    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::table('tasks')->delete();
 
        $tasks = array(
            ['id' => 1, 'name' => 'Task 1', 'project_id' => 1, 'completed' => false, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 2, 'name' => 'Task 2', 'project_id' => 1, 'completed' => false, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 3, 'name' => 'Task 3', 'project_id' => 1, 'completed' => false, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 4, 'name' => 'Task 4', 'project_id' => 1, 'completed' => true, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 5, 'name' => 'Task 5',  'project_id' => 1, 'completed' => true,'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 6, 'name' => 'Task 6',  'project_id' => 2, 'completed' => true, 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 7, 'name' => 'Task 7', 'project_id' => 2, 'completed' => false, 'created_at' => new DateTime, 'updated_at' => new DateTime],
        );
 
        //// Uncomment the below to run the seeder
        DB::table('tasks')->insert($tasks);
    }
 
}