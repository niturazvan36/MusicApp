 provider "aws" {
    region = "eu-central-1"
}

resource "aws_db_instance" "licenta_db" {
  allocated_storage    = 20
  engine               = "mysql"
  engine_version       = "8.0.35"
  instance_class       = "db.t3.micro"
  db_name              = "mydb"
  username             = "admin"
  password             = "silviucandale1234"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true
  publicly_accessible  = true

}