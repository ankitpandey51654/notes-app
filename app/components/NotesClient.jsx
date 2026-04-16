"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ inititalNotes }) => {
  const [notes, setNotes] = useState(inititalNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const result = await res.json();
      if (result.success) {
        setNotes([result.data, ...notes]);
        toast.success("Note created ✨");
        setTitle("");
        setContent("");
      }
    } catch {
      toast.error("Error creating note");
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setNotes(notes.filter((n) => n._id !== id));
        toast.success("Deleted 🗑️");
      }
    } catch {
      toast.error("Delete failed");
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
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const result = await res.json();
      if (result.success) {
        setNotes(notes.map((n) => (n._id === id ? result.data : n)));
        toast.success("Updated ✅");
        cancelEdit();
      }
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Create Note */}
      <form
        onSubmit={createNote}
        className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          ✍️ Create Note
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          📚 Your Notes ({notes.length})
        </h2>

        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <div className="grid gap-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition border"
              >
                {editingId === note._id ? (
                  <div className="space-y-3">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />

                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateNote(note._id)}
                        className="bg-green-500 text-white px-4 py-1 rounded-lg"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-4 py-1 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{note.title}</h3>
                      <div className="flex gap-3 text-sm">
                        <button
                          onClick={() => startEdit(note)}
                          className="text-blue-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteNote(note._id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{note.content}</p>

                    <div className="text-xs text-gray-400" suppressHydrationWarning>
                      {new Date(note.createdAt).toLocaleDateString()}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesClient;
