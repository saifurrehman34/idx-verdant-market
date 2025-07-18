import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from './data-table';
import { columns, type Product } from './columns';

async function getProducts(): Promise<Product[]> {
    const supabase = createAdminClient();
    const { data, error } = await supabase
        .from('products')
        .select(`
            id,
            name,
            price,
            image_url,
            categories ( name )
        `)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return data as Product[];
}

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products.</CardDescription>
                </div>
                <Button asChild>
                    <Link href="/admin/products/add">Add Product</Link>
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={products} />
            </CardContent>
        </Card>
    );
}
