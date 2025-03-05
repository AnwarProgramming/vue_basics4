
Vue.component('message-board', {
    props: ['title'],
    template: `
    <div>
    <h4>{{title}}</h4>        <!-- this title is title of message board in html page -->
    Your name : <input type="text" v-model="visitor_name"><br>
    Your message : <input type="text" v-model="visitor_message"><br>
    <button v-on:click="sayHi">Say Hi</button> <!--v-on:click="sayHi" here sayHi is a method -->
    <i class="bi bi-cloud-arrow-up-fill" v-bind:class= "savedIconClass"></i>
    (The color of cloud icon will change)

    <h2>Messages</h2>
    <ul>
        <li v-for="message in messages">{{message["visitor_name"]}} : {{message["visitor_message"]}}</li>
    </ul>
    </div>
    `,
    data: function () {
        return {
            visitor_name: "",
            visitor_message: "",
            savedIconClass: "text-success",
            messages: []
        }
    },
    methods: {
        sayHi: function (name) { // When someone clicks on say hi it triggers the function
            this.messages.push({
                "visitor_name": this.visitor_name,
                "visitor_message": this.visitor_message
            });

            // Save to backend using API here
            this.savedIconClass = "text-warning";
            fetch('https://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "for": this.title, "visitor_name": this.visitor_name, "visitor_message": this.visitor_message })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.savedIconClass = "text-success";
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.savedIconClass = "text-danger";
                })

            this.visitor_name = "";
            this.visitor_message = "";
            this.$emit("add-to-global-total");
        },
    },
    computed: {
        count: function () {
            return this.messages.length; // This will return length of the visitors array
        }
    },
    mounted: function () {
        // get the previous messages sent to Fatima and display
        this.messages = [{ "for": "Fatima's Board", "visitor_name": "Rajesh", "visitor_message": "Hello world" }]
    }
})


var app = new Vue({
    el: "#app", //el is id of the html tag
    data: {
        global_count: 0,
    },
    methods: {
        count_global: function () {
            this.global_count += 1;
        }
    }
})