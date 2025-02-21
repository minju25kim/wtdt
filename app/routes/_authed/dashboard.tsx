import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { createServerFn } from '@tanstack/start'
import { getSupabaseServerClient } from '@/lib/supabase'

export const Route = createFileRoute('/_authed/dashboard')({
    component: RouteComponent,
    loader: async () => await getProjects()
})

const getProjects = createServerFn({ method: 'GET' })
    .handler(async () => {
        const supabase = await getSupabaseServerClient();

        // Get authenticated user
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

        if (authError) {
            console.error('Auth error:', authError);
            throw authError;
        }

        if (!authUser) {
            console.warn('No authenticated user found');
            return [];
        }

        // Fetch projects for the authenticated user
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', authUser.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }

        if (!data || data.length === 0) {
            console.log('No projects found for user:', authUser.id);
            return [];
        }

        return data;
    })

const handleCreateProject = createServerFn({ method: 'POST' }).handler(async () => {
    const supabase = await getSupabaseServerClient();

    // Get authenticated user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

    if (authError) {
        console.error('Auth error:', authError);
        throw authError;
    }

    if (!authUser) {
        console.warn('No authenticated user found');
        return [];
    }

    // Fetch projects for the authenticated user
    const { data, error } = await supabase
        .from('projects')
        .insert({
            user_id: authUser.id,
            name: 'New Project',
        })
        .select('id')

    if (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }

    if (!data || data.length === 0) {
        console.log('No projects found for user:', authUser.id);
        return [];
    }

    console.log('data', data)
    return data;

})

function RouteComponent() {
    const router = useRouter()
    const projects = Route.useLoaderData()

    return (
        <div className="grid grid-cols-2 gap-2 h-full">
            <div className="border p-2">
                <h2 className="text-lg font-semibold mb-4">Chat</h2>
            </div>
            <div className="h-full grid grid-rows-[auto_600px] gap-2">
                <div className="border">
                    <h2 className="text-lg font-semibold mb-4">user</h2>
                </div>
                <div className="border flex flex-col gap-2">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">Project</h2>
                        <Button variant="outline" onClick={() => {
                            handleCreateProject()
                                .then(() => {
                                    router.invalidate()
                                })
                        }}>Create a new project</Button>
                    </div>
                    <div>
                        {projects.map((project) => (
                            <div key={project.id}>
                                <Link to={`/$projectId`} params={{ projectId: project.id }}>
                                    <h3>{project.id}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
