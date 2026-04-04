export const getFilteredTasks = (tasks, priorityFilter, statusFilter, sortOrder) => {
  
  // STEP 1: Filter the tasks
  const filteredList = tasks.filter((task) => {
    
    // Checkpoint A: Priority
    // If the dropdown is empty, it's TRUE. If not, it must match.
    const isPriorityMatch = 
      priorityFilter === "" || 
      task.priority.toLowerCase() === priorityFilter.toLowerCase();

    // Checkpoint B: Status
    // If the dropdown is empty, it's TRUE. If not, it must match.
    const isStatusMatch = 
      statusFilter === "" || 
      task.status.toLowerCase() === statusFilter.toLowerCase();

    // Only if BOTH are true does the task stay in the list
    return isPriorityMatch && isStatusMatch;
  });

  // STEP 2: Sort the filtered list by Date
  // We use .sort() after the .filter() is finished
  return filteredList.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    if (sortOrder === "latest") {
      return dateB - dateA; // Newest tasks come first
    } else {
      return dateA - dateB; // Oldest tasks come first
    }
  });
};