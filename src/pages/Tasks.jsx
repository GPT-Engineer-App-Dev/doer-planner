import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    setTasks([...tasks, currentTask]);
    setCurrentTask({ title: "", description: "" });
    setIsModalOpen(false);
  };

  const handleEditTask = (index) => {
    setCurrentTask(tasks[index]);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveEditTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? currentTask : task
    );
    setTasks(updatedTasks);
    setCurrentTask({ title: "", description: "" });
    setIsEditing(false);
    setEditIndex(null);
    setIsModalOpen(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              />
              <Textarea
                placeholder="Description"
                value={currentTask.description}
                onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={isEditing ? handleSaveEditTask : handleAddTask}>
                  {isEditing ? "Save" : "Add"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" size="icon" onClick={() => handleEditTask(index)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleDeleteTask(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;