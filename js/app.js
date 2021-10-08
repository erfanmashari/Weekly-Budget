// classes
class UI {
    // show budget in html
    showBudget(budget) {
        // validate or show budget
        if (budget === null) {
            // reload page
            location.reload()
        } else if (!Number(budget.valueOf()) > 0 || budget.valueOf().includes("-", "_", "*", "/", "+", "=")) {
            // reload page
            location.reload()
        } else {
            document.querySelector("#h3-budget").innerHTML = budget
            document.querySelector("#left-budget").innerHTML = budget
        }
    }

    // show expense in list and new budget
    showExpense(name, amount) {
        // create list
        const li = document.createElement("li")
        li.innerHTML = `${name}: ${amount}`
        li.id = "li"

        // append li to ul
        document.querySelector("#costs").appendChild(li)
    }

    // calculate left budget
    calculateLeft(name, amount) {
        // get left budget
        const left = Number(document.querySelector("#left-budget").textContent)

        // calculate left budgetminus expense
        let result = left - amount


        // check if amount is less than budget
        if (result < 0) {
            // print error
            this.printError("مقدار هزینه ورودی از بودجه باقیمانده کمتر است!", "d-flex justify-content-center align-items-center text-white border border-2 border-warning")
        } else {
            // show li expense
            this.showExpense(name, amount)

            // show left budget
            document.querySelector("#left-budget").innerHTML = result

            // let user now how manyof budget is left
            const firstBudget = Number(document.querySelector("#h3-budget").textContent)
            if (result <= firstBudget * 0.5 && result > firstBudget * 0.25) {
                console.log("0.5");
                document.querySelector("#left").classList = "col-lg-12 p-3 h5 border border-3 border-warning"
            } else if (result <= firstBudget * 0.25) {
                console.log("0.25");
                document.querySelector("#left").classList = "col-lg-12 p-3 h5 border border-3 border-danger"
            }
        }
    }

    // print Errors
    printError(message, className) {
        // access to body
        const body = document.querySelector("#body")

        // create div
        const div = document.createElement("div")
        div.innerHTML = message
        div.classList = className
        div.id = "fixed"

        // append div to body
        body.appendChild(div)

        // remove div after 3sec
        setTimeout(() => {
            div.remove()
        }, 3000);
    }
}

// variables
const ui = new UI()


// eventListeners
eventListeners()

function eventListeners() {
    // show prompt when page reload
    document.addEventListener("DOMContentLoaded", () => {
        // show prompt
        const budget = prompt("مقدار بودجه خود را وارد نمایید:")

        // send budget value
        ui.showBudget(budget)
    })

    // add event to enter button
    document.querySelector("#inputs").addEventListener("submit", e => {
        e.preventDefault()

        // get inputs value
        const name = document.querySelector("#name").value
        const amount = document.querySelector("#amount").value

        if (name === "" || amount === "" || amount <= 0 || amount.includes("-", "_", "*", "/", "+", "=")) {
            // print error
            ui.printError("مقادیر را به درستی وارد نمایید!", "d-flex justify-content-center align-items-center text-white border border-2 border-warning")
        } else {
            // calculate left budget
            ui.calculateLeft(name, Number(amount))

            // reset form
            document.querySelector("#inputs").reset()
        }
    })
}