# User manual for the presentation

## Appointing Channel for Presentation

In order to let connected channels use Watson's services and stream data, **Director View** (this page) must select them as candidate. Once a channel appears in the channel list, click the select button next to it's name and state to appoint it as a candidate. The selected channel will now have access to use microphone to start the Watson speech to text service.

## States for Channels

* **`IDLE`** – This is the default state for the connected channel. No action has been taken yet on either Director's or channels' part.
* **`APPOINTED`** – Once the Director View has selected a channel for candidacy, and the channel has picked up on it.
* **`MEDIA`** – The channel has succesfully allowed the browser to use a microphone.
* **`READY`** – Channel is ready to start recording and streaming data. The channel is a candidate and a microphone has been selected.
* **`FINISHED`** – Recording has been stopped. Sending the data to Watson's Tone Analyzer.
* **`ANALYZED`** – The channel's data has been analyzed and it's ready to use.
* **`ERROR`** – The channel didn't successfully allow the use of microphone. The process can not be continued. This state can only happen after the `appointed` state.
