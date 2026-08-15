output "meblog_server_ip" {
  value = "${multipass_instance.meblog_server.ipv4[0]}"
}