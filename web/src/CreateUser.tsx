import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  getGetUsersQueryKey,
  useCreateUser,
} from "./http/generated/users/users";

const createUserSchema = z.object({
  name: z.string().min(3),
});

type CreateUserSchema = z.infer<typeof createUserSchema>;

export function CreateUser() {
  const queryClient = useQueryClient(); // meu hook para acessar o queryClient do react-query

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });

  const { mutateAsync: createUser } = useCreateUser(); // meu useQuery para criar usuário gerado pelo react-query e Orval

  async function handleCreateUser(data: CreateUserSchema) {
    await createUser({
      data: {
        name: data.name,
      },
    });

    await queryClient.invalidateQueries({
      queryKey: getGetUsersQueryKey(),
    }); // invalida a query de usuários para que ela seja refeita

    console.log(getGetUsersQueryKey());

    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <input type="text" {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}
