import React, { useEffect, useState } from 'react';
import {
  HeadingMedium,
  VerticalStackLayout,
  Spinner,
  LabelLarge,
  ParagraphSmall,
  Button,
  MenuItem,
} from '../../components';
import { ButtonKind, ButtonSize } from '../../types/button';
import SharedTaskService from '../../services/shared-tasks.service';
// import { SharedTask } from '../../types/shared-task';
import { AsyncError } from '../../types';
import { toast } from 'react-hot-toast';
import CommentList from '../comments/comments';
import AddComment from '../comments/new-comment';
import { Task } from '../../types/task';

const sharedTaskService = new SharedTaskService();

const SharedTasks: React.FC = () => {
  const [sharedTasks, setSharedTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedTasks = async () => {
      setIsLoading(true);
      try {
        const response = await sharedTaskService.getSharedTasks();
        setSharedTasks(response.data);   
      } catch (error) {
        toast.error((error as AsyncError).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSharedTasks();
  }, []);
  const toggleComments = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto h-screen max-w-screen-2xl overflow-y-auto p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-5xl">
        <VerticalStackLayout gap={7}>
          <HeadingMedium>Shared Tasks</HeadingMedium>
          {sharedTasks.map((task) => (
        <div
          className="relative rounded-sm border border-stroke bg-white p-9 shadow-default"
          key={task.id}
        >
          <VerticalStackLayout gap={3}>
            <LabelLarge>{task.title}</LabelLarge>
            <ParagraphSmall>{task.description}</ParagraphSmall>
          </VerticalStackLayout>

          <div className="absolute right-4 top-4">
            <MenuItem> 
              <Button
                onClick={() => toggleComments(task.id)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
              >
                {selectedTaskId === task.id ? 'Hide Comments' : 'Comments'}
              </Button>
            </MenuItem>
          </div>

          {selectedTaskId === task.id && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <CommentList taskId="66af7cce7b46c5b435d8404d" />
              <AddComment taskId="66af7cce7b46c5b435d8404d" />
            </div>
          )}
        </div>
      ))}
        </VerticalStackLayout>
      </div>
    </div>
  );
};

export default SharedTasks;
