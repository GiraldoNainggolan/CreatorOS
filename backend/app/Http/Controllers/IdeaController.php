<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use Illuminate\Http\Request;

class IdeaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Idea::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'angle' => 'nullable|string|max:255',
            'content_pillar' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:Draft,Approved',
        ]);

        $idea = Idea::create($validated);

        return response()->json($idea, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Idea $idea)
    {
        return response()->json($idea);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Idea $idea)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'angle' => 'nullable|string|max:255',
            'content_pillar' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:Draft,Approved',
        ]);

        $idea->update($validated);

        return response()->json($idea);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea)
    {
        $idea->delete();
        return response()->json(null, 204);
    }
}
