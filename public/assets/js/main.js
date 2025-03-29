document.body.$prepend(`
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <a href="#" class="text-2xl font-bold text-blue-600">MyLogo</a>
      <nav class="hidden md:flex space-x-6">
        <a href="#" class="text-gray-700 hover:text-blue-600">Home</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">About</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">Services</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">Contact</a>
      </nav>
    </div>
  </header>
`);

const container = document.querySelector("#container");
container.$prepend("<p>foo</p>");
container.$append("<p>bar</p>");