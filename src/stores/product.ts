import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import dataSrc from '../data/jason.json'


export type Product = {
    id: number,
    category: string,
    title: string,
    price: number,
    quantity: any,
    image?: any,
    rating: {
        count: number,
        rate: number
    },
    description: string
}

export const useProductStore = defineStore('product', () => {

    const productLists = ref<Product[]>([])

    const categoryTypes = computed(() => {
        return [...new Set(productLists.value.map(item => item.category))]
    })

    const setProductforModal = ref<Product>()

    function openModal(item?: Product) {
        const modal = document.getElementById('my_modal_4') as HTMLDialogElement
        modal.showModal()
        setProductforModal.value = item
    }


    // const selectedCategory = ref('');
    // const Product = ref(null);

    // Method to fetch data based on the selected category
    // const fetchCategoryData = (category) => {
    //     selectedCategory.value = category;

    //     // Simulate an API call to fetch data
    //     setTimeout(() => {
    //         Product.value = Fetched data for ${category};
    //     }, 1000);
    // };

    //   getData()


    // fetch('https://fakestoreapi.com/products')
    //   .then(response => response.json())
    //   .then(json => console.log(json))

    // for(let o of productLists.value) {
    //     console.log(o.)
    // }
    // const getData = async () => {
    //     const data: Product[] = await fetch('https://fakestoreapi.com/products').then(res => res.json())
    //     console.log(data);
    // }

    // getData()

    // const getProductsByType = () => {
    //     if (productLists.value == )
    // }
    // const selectedCategory = ref('');
    // const filteredItems = ref([]);
    // const selectedCategory = ref('');


    // const fetchCategoryData = (c: any) => {
    //     selectedCategory.value = c;


    //     selectedCategory.value = Fetched data for ${c};
    //     console.log(selectedCategory.value);
    //     productLists.value.filter((item: any) => item.category === selectedCategory.value);

    //     setTimeout(() => {
    //     selectedCategory.value = Fetched data for ${c};
    //   }, 1000);


    // //   if (selectedCategory.value == '') {
    // //     Product.value = null;
    // //   } else {
    // //     selectedCategory.value = Fetched data for ${c};
    // //   }
    // };

    // fetchCategoryData(selectedCategory.value)


    // const filterItems = (item: any) => {
    //         if (!selectedCategory.value) {
    //             return(productLists.value = item)
    //         }   
    //         // selectedCategory.value = productLists.value;
    //         // productLists.value = productLists.value.filter(item => item.category === selectedCategory.value);
    //     };
    //     filterItems(productLists.value)


    const filterItems = (category: string) => {
        productLists.value = productLists.value.filter(product => product.category === category);
        console.log(productLists.value.length);
    };




    const createProduct = (product: Product) => {
        productLists.value.push(product)
        localStorage.setItem('products', JSON.stringify(productLists.value))
    }

    const getInitialProducts = async () => {
        const data: Product[] = await fetch('https://mockapi.io/clone/6825c4ce0f0188d7e72e60bf').then(res => res.json())
        // const data: Product[] = dataSrc as any
        // console.log(data);

        // const products = localStorage.getItem('products')
        // if (data && data.length > 0) {
        //     productLists.value = data
        // } else if (products) productLists.value = JSON.parse(products)
    }

    return { productLists, createProduct, getInitialProducts, categoryTypes, setProductforModal, openModal }
})