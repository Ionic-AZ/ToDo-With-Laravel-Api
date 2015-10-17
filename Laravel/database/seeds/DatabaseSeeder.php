<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //$this->call(UserTableSeeder::class);
          // Uncomment the below to wipe the table clean before populating
        DB::table('users')->delete();
 
  		$users = array(
                [ 'email' => 'ryanchenkie@gmail.com', 'password' => Hash::make('secret')],
                [ 'email' => 'chris@scotch.io', 'password' => Hash::make('secret')],
                ['email' => 'holly@scotch.io', 'password' => Hash::make('secret')],
                ['email' => 'adnan@scotch.io', 'password' => Hash::make('secret')],
        );
            
 
        // Uncomment the below to run the seeder
        DB::table('users')->insert($users);
        
		$this->call('ProjectsTableSeeder');
		$this->call('TasksTableSeeder');
        Model::reguard();
    }
}
