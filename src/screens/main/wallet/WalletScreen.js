import React from "react"
import { View } from "react-native"
import { Button } from "react-native-paper"
import Entypo from "react-native-vector-icons/Entypo"
import { connect } from "react-redux"
import stripe from "tipsi-stripe"
import fetch from "lib/fetch"
import colors from "res/colors"

stripe.setOptions({
    publishableKey: "pk_test_WZf3OyDJZJQgg61n9mR1zdeS"
})

class WalletScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Entypo size={22} name="wallet" color={tintColor} />
        )
    }

    state = {
        isPaymentPending: false
    }

    requestPayment = () => {
        this.setState({ isPaymentPending: true })
        return stripe
            .paymentRequestWithCardForm({
                requiredBillingAddressFields: "full"
            })
            .then(stripeTokenInfo => {
                return doPayment(100, stripeTokenInfo.tokenId)
            })
            .finally(() => {
                this.setState({ isPaymentPending: false })
            })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Button
                    mode="contained"
                    dark={true}
                    loading={this.state.isPaymentPending}
                    disabled={this.state.isPaymentPending}
                    onPress={this.requestPayment}
                >
                    Make a payment
                </Button>
            </View>
        )
    }
}

export default connect(
    () => ({}),
    {}
)(WalletScreen)
