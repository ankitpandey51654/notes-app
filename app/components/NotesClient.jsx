"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ inititalNotes }) => {
  const [notes, setNotes] = useState(inititalNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState(null);
  const [editContent, setEditContent] = useState("");

  const createNote = async (e) => {
    debugger;
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (result.success) {
        setNotes([result.data, ...notes]);
        toast.success("Notes Created Successfully");
        setTitle("");
        setContent("");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Notes Delted Successfully");
      }
    } catch (error) {
      console.error("Error deleting Note:", error);
      toast.error("Something Went wrong");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Notes Updated Successfully");
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };
  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          ></input>

          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          ></textarea>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-40"
            type="Submit"
            disabled={loading}
          >
            {loading ? "creating...." : "Create Note"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold"> your notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">
            {" "}
            No Notes Yet. create your First Note Above
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
              {editingId === note._id ? (
                <>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></input>
                    <textarea
                      placeholder="Note Content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    ></textarea>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateNote(note._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-40"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-40"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p className="text-sm text-gray-500">
                    Created:{" "}
                    {new Date(note.createdAt).toLocaleDateString("en-US")}
                  </p>
                  {note.updatedAt !== note.createdAt && (
                    <p className="text-sm text-gray-500">
                      updated:{" "}
                      {new Date(note.updatedAt).toLocaleDateString("en-US")}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
