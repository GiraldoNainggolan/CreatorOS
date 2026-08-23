<?php

namespace Tests\Feature\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Idea;

class IdeaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_ideas()
    {
        Idea::create(['title' => 'First Idea']);
        Idea::create(['title' => 'Second Idea', 'angle' => 'A unique angle']);

        $response = $this->getJson('/api/ideas');

        $response->assertStatus(200)
            ->assertJsonCount(2);
    }

    public function test_can_create_idea()
    {
        $payload = [
            'title' => 'New Idea',
            'angle' => 'Interesting Angle',
            'content_pillar' => 'Tech',
            'status' => 'Draft',
        ];

        $response = $this->postJson('/api/ideas', $payload);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'New Idea']);

        $this->assertDatabaseHas('ideas', ['title' => 'New Idea']);
    }

    public function test_cannot_create_idea_without_title()
    {
        $payload = [
            'angle' => 'Interesting Angle',
        ];

        $response = $this->postJson('/api/ideas', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors('title');
    }

    public function test_can_show_idea()
    {
        $idea = Idea::create(['title' => 'Show me']);

        $response = $this->getJson('/api/ideas/' . $idea->id);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Show me']);
    }

    public function test_can_update_idea()
    {
        $idea = Idea::create(['title' => 'Old Title']);

        $response = $this->putJson('/api/ideas/' . $idea->id, [
            'title' => 'New Title'
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'New Title']);

        $this->assertDatabaseHas('ideas', ['title' => 'New Title']);
    }

    public function test_can_delete_idea()
    {
        $idea = Idea::create(['title' => 'Delete me']);

        $response = $this->deleteJson('/api/ideas/' . $idea->id);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('ideas', ['id' => $idea->id]);
    }
}
